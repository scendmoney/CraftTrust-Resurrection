import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { SubcompanyModel } from '@entities/subcompany/subcompany.model';
import ErrorMsgEnum from '@enums/error';
import { CompanyStatusEnum } from '@entities/company/company.enum';
import { TwilioService } from 'libs/twilio/src';
import { SurveyModel } from './survey.model';
import { CreateSurveyInput, SubmitSurveyInput } from './survey.input';
import { SurveysModel } from './survey.dto';
import { SurveyStatusEnum } from './survey.enum';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import QueryService from '@common/query';
import { CONFIG } from '@config/index';
import { RedisGraphqlService } from 'libs/redis/src';
import { CompanyModel } from '@entities/company/company.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuardClient } from '@entities/auth/auth.guard';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import {
  EmailTemplatesEnum,
  JobEnum,
  QueueEnum,
  SubscriptionsEnum,
} from '@enums/common';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';
import { addPrifixEmail, logoNfts } from '@src/utils/utils';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { NFTStatusEnum, NFTTypeEnum } from '@entities/nft/nft.enum';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import NFTModel from '@entities/nft/nft.model';
import { v4 as uuidv4 } from 'uuid';
import sample from 'lodash/sample';

@Resolver(() => SurveyModel)
export class SurveyResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly twilioService: TwilioService,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly customerioService: CustomerioService,
    @InjectQueue(QueueEnum.queueHedera) private readonly queueHedera: Queue,
  ) {}

  @UseGuards(AuthGuardClient)
  @Mutation(() => SurveyModel, {
    description: '@public - create survey',
  })
  async createSurvey(
    @Args('payload', { type: () => CreateSurveyInput })
    { subcompanyId }: CreateSurveyInput,
    @CurrentCtx() { user },
  ): Promise<SurveyModel> {
    const [surveyDb, subcompany] = await Promise.all([
      this.dataSource.getRepository(SurveyModel).findOne({
        where: {
          subcompany: {
            id: subcompanyId,
          },
          user: {
            id: user.id,
          },
        },
      }),
      this.dataSource.getRepository(SubcompanyModel).findOne({
        where: {
          id: subcompanyId,
        },
        relations: ['facilityBuyer.owner', 'company.facilityCultivator'],
      }),
    ]);

    if (!subcompany) {
      throw new Error(ErrorMsgEnum.SubcompanyNotExist);
    }

    if (!subcompany.__company__) {
      throw new Error(ErrorMsgEnum.CompanyNotExist);
    }

    if (subcompany.__company__.status !== CompanyStatusEnum.Active) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    if (subcompany.quantitySold === subcompany.quantity) {
      throw new Error(ErrorMsgEnum.CompanyProductOutOfStock);
    }

    if (surveyDb) {
      return surveyDb;
    }

    const survey = await this.dataSource
      .getRepository(SurveyModel)
      .create({
        subcompany: {
          id: subcompanyId,
        },
        fullName: user.fullName,
        phone: user.phoneNumber,
        uuid: uuidv4(),
        user: {
          id: user.id,
        },
      })
      .save();

    const buyerEmail =
      subcompany.__facilityBuyer__.campaignEmail ||
      subcompany.__facilityBuyer__?.__owner__?.email;

    await Promise.allSettled([
      this.dataSource
        .getRepository(CompanyModel)
        .update(subcompany.__company__.id, {
          id: subcompany.__company__.id,
          totalPeopleRegistered: () => `totalPeopleRegistered + 1`,
        }),
      this.dataSource.getRepository(SubcompanyModel).update(subcompany.id, {
        isSurveyPending: () => `
          (SELECT count(*) > 0 
            FROM public.survey
            where subcompany_id = ${subcompany.id} and status = 'New'::public.survey_status_enum
          )`,
      }),
      this.dataSource
        .getRepository(NFTModel)
        .create({
          type: NFTTypeEnum.survey,
          name: `CraftTrust #${survey.id}`,
          description: `CraftTrust #${survey.id}`,
          logoURL: sample(logoNfts),
          tokenId: CONFIG.hedera.surveyNFTToken,
          properties: {
            external_url: 'https://crafttrust.com',
          },
          user: {
            id: user.id,
          },
          status: NFTStatusEnum.blocked,
          survey: {
            id: survey.id,
          },
        })
        .save(),
      this.redisGraphqlService.publish(SubscriptionsEnum.surveyActivated, {
        [SubscriptionsEnum.surveyActivated]: {
          id: survey.id,
          facilityId: subcompany.__facilityBuyer__?.id,
        },
      }),
      this.customerioService.sendEmail({
        to: buyerEmail,
        subject: `Action Required: Request for Ratings tool link`,
        message_data: {
          campaignName: subcompany.__company__?.companyName,
          cultivatorName: subcompany.__company__?.__facilityCultivator__?.name,
          buyerName: subcompany.__facilityBuyer__?.name,
        },
        transactional_message_id: addPrifixEmail(
          EmailTemplatesEnum.surveyNewCustomer,
          CONFIG.platform.ENV.toLowerCase(),
        ),
        identifiers: {
          id: CustomerIoDataService.getUserId(subcompany.__facilityBuyer__?.id),
        },
      }),
    ]);

    return this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id: survey.id,
      },
    });
  }

  @UseGuards(AuthGuardClient)
  @Mutation(() => SurveyModel, {
    description: '@public - submit survey',
  })
  async submitSurvey(
    @Args('payload', { type: () => SubmitSurveyInput })
    payload: SubmitSurveyInput,
    @CurrentCtx() { user },
  ): Promise<SurveyModel> {
    const surveyDb = await this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id: payload.id,
        status: SurveyStatusEnum.BuyerConfirmed,
        user: {
          id: user.id,
        },
      },
      relations: ['subcompany.company', 'nft'],
    });

    if (!surveyDb) {
      throw new Error(ErrorMsgEnum.SurveyNotExist);
    }

    if (surveyDb.status !== SurveyStatusEnum.BuyerConfirmed) {
      throw new Error(ErrorMsgEnum.SurveyStatusWrong);
    }

    if (
      surveyDb.__subcompany__.quantitySold === surveyDb.__subcompany__.quantity
    ) {
      throw new Error(ErrorMsgEnum.CompanyProductOutOfStock);
    }

    if (
      surveyDb.__subcompany__.__company__.status !== CompanyStatusEnum.Active
    ) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    const result = await this.dataSource
      .getRepository(SurveyModel)
      .create({
        ...payload,
        id: surveyDb.id,
        surveySentDate: new Date(),
        status: SurveyStatusEnum.SurveySent,
        nft: {
          id: surveyDb.__nft__.id,
          status: NFTStatusEnum.processing,
        },
      })
      .save();

    await Promise.allSettled([
      this.dataSource
        .getRepository(CompanyModel)
        .update(surveyDb.__subcompany__.__company__.id, {
          id: surveyDb.__subcompany__.__company__.id,
          totalPeopleCompleted: () => `totalPeopleCompleted + 1`,
        }),
      ,
      this.twilioService.sendSMS(
        `Voucher link: ${CONFIG.platform.platformUrl}/ratings/qr-code?uuid=${surveyDb.uuid}`,
        surveyDb.phone,
      ),
      this.queueHedera.add(
        JobEnum.mintNFTJob,
        {
          nftId: result.__nft__?.id,
        },
        {
          attempts: 2,
          removeOnComplete: true,
          removeOnFail: true,
        },
      ),
    ]);

    return this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id: surveyDb.id,
      },
    });
  }

  @UseGuards(AuthGuardClient)
  @Query(() => SurveyModel, {
    description: '@protected - Get survey by ID (by user cultivator)',
  })
  async surveyByIdClient(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations, user },
  ): Promise<SurveyModel> {
    return QueryService.item<SurveyModel>(
      this.dataSource.getRepository(SurveyModel),
      {
        payload,
        relations,
      },
      {
        id: payload.id,
        user: {
          id: user.id,
        },
      },
    );
  }

  @UseGuards(AuthGuardClient)
  @Query(() => SurveysModel, {
    description: '@public - surveys client',
  })
  async surveysClient(
    @Args('payload', { type: () => FilterGetDTO })
    payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
  ): Promise<SurveysModel> {
    return QueryService.list<SurveysModel>(
      this.dataSource.getRepository(SurveyModel),
      {
        payload,
        relations,
      },
      {
        user: {
          id: user.id,
        },
      },
    );
  }
}
