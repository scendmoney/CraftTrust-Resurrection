import { Resolver, Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { CompanyStatusEnum } from '@entities/company/company.enum';
import { SurveyModel } from './survey.model';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { SurveysModel } from './survey.dto';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import QueryService from '@common/query';
import { SurveyStatusEnum } from './survey.enum';
import { CONFIG } from '@config/index';
import { TwilioService } from 'libs/twilio/src';
import { SubcompanyModel } from '@entities/subcompany/subcompany.model';
import { EmailTemplatesEnum, SubscriptionsEnum } from '@enums/common';
import { RedisGraphqlService } from 'libs/redis/src';
import { CompanyModel } from '@entities/company/company.model';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { addPrifixEmail } from '@src/utils/utils';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';

@Resolver(() => SurveyModel)
export class SurveyBuyerResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly twilioService: TwilioService,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly customerioService: CustomerioService,
  ) {}

  @Mutation(() => SurveyModel, {
    description: '@private - confirm survey buyer',
  })
  @UseGuards(AuthGuardUser)
  async confirmSurveyBuyer(
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<SurveyModel> {
    const survey = await this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id,
        subcompany: {
          facilityBuyer: {
            id: user.__context__?.id,
          },
        },
      },
      relations: ['subcompany.company.productSurvey'],
    });

    if (!survey) {
      throw new Error(ErrorMsgEnum.SurveyNotExist);
    }

    if (survey.status !== SurveyStatusEnum.New) {
      throw new Error(ErrorMsgEnum.SurveyStatusWrong);
    }
    const subcompany = survey.__subcompany__;

    if (subcompany.quantitySold === subcompany.quantity) {
      throw new Error(ErrorMsgEnum.CompanyProductOutOfStock);
    }

    if (subcompany.__company__.status !== CompanyStatusEnum.Active) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    await this.dataSource.getRepository(SurveyModel).update(survey.id, {
      buyerConfirmedDate: new Date(),
      status: SurveyStatusEnum.BuyerConfirmed,
    });

    await Promise.allSettled([
      this.twilioService.sendSMS(
        `Ratings tool link: ${CONFIG.platform.platformUrl}/ratings/${survey.id}`,
        survey.phone,
      ),
      this.dataSource
        .getRepository(SubcompanyModel)
        .update(survey.__subcompany__.id, {
          isSurveyPending: () => `
            (SELECT count(*) > 0 
              FROM public.survey
              where subcompany_id = ${survey.__subcompany__.id} and status = 'New'::public.survey_status_enum
            )`,
        }),
    ]);

    return this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id,
      },
      relations,
    });
  }

  @Mutation(() => SurveyModel, {
    description: '@private - reject survey buyer',
  })
  @UseGuards(AuthGuardUser)
  async rejectSurveyBuyer(
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<SurveyModel> {
    const survey = await this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id,
        subcompany: {
          facilityBuyer: {
            id: user.__context__?.id,
          },
        },
      },
      relations: ['subcompany.company'],
    });

    if (!survey) {
      throw new Error(ErrorMsgEnum.SurveyNotExist);
    }

    if (survey.status !== SurveyStatusEnum.New) {
      throw new Error(ErrorMsgEnum.SurveyStatusWrong);
    }

    if (survey.__subcompany__.__company__.status !== CompanyStatusEnum.Active) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    await this.dataSource.getRepository(SurveyModel).update(survey.id, {
      buyerRejectedDate: new Date(),
      status: SurveyStatusEnum.Rejected,
    });

    await this.dataSource
      .getRepository(SubcompanyModel)
      .update(survey.__subcompany__.id, {
        isSurveyPending: () => `
        (SELECT count(*) > 0 
          FROM public.survey
          where subcompany_id = ${survey.__subcompany__.id} and status = 'New'::public.survey_status_enum
        )`,
      });

    return this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id,
      },
      relations,
    });
  }

  @Mutation(() => SurveyModel, {
    description: '@private - survey package confirmed',
  })
  @UseGuards(AuthGuardUser)
  async surveyPackageConfirmed(
    @Args('uuid', { type: () => String }) uuid: string,
    @CurrentCtx() { user, relations },
  ): Promise<SurveyModel> {
    const surveyDb = await this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        uuid: uuid,
      },
      relations: [
        'subcompany.company.facilityCultivator.owner',
        'subcompany.facilityBuyer',
      ],
    });

    if (!surveyDb) {
      throw new Error(ErrorMsgEnum.EntityNotExist);
    }

    if (surveyDb.status === SurveyStatusEnum.Done) {
      throw new Error(ErrorMsgEnum.SurveyDone);
    }

    if (surveyDb.status != SurveyStatusEnum.SurveySent) {
      throw new Error(ErrorMsgEnum.SurveyStatusWrong);
    }

    if (surveyDb.__subcompany__.__facilityBuyer__.id !== user.__context__?.id) {
      throw new Error(ErrorMsgEnum.SurveyBuyerWrong);
    }

    if (
      surveyDb.__subcompany__.quantitySold === surveyDb.__subcompany__.quantity
    ) {
      throw new Error(ErrorMsgEnum.CompanyProductOutOfStock);
    }

    await Promise.all([
      this.dataSource
        .getRepository(SubcompanyModel)
        .update(surveyDb.__subcompany__.id, {
          id: surveyDb.__subcompany__.id,
          quantitySold: () => 'quantitySold + 1',
          company: {
            id: surveyDb.__subcompany__.__company__.id,
          },
        }),
      this.dataSource
        .getRepository(SurveyModel)
        .create({
          id: surveyDb.id,
          completedDate: new Date(),
          status: SurveyStatusEnum.Done,
        })
        .save(),
      this.dataSource
        .getRepository(CompanyModel)
        .update(surveyDb.__subcompany__.__company__.id, {
          id: surveyDb.__subcompany__.__company__.id,
          totalPeopleRedemption: () => `totalPeopleRedemption + 1`,
        }),
    ]);

    if (
      surveyDb.__subcompany__.quantity -
        surveyDb.__subcompany__.quantitySold ===
      1
    ) {
      const company = surveyDb.__subcompany__.__company__;
      const cultivatorEmail =
        company.__facilityCultivator__?.campaignEmail ||
        company.__facilityCultivator__?.__owner__?.email;
      await this.customerioService.sendEmail({
        to: cultivatorEmail,
        subject: `Buyer ${surveyDb.__subcompany__.__facilityBuyer__.name} from ${company.companyName} has run out of Top Shelf Grams Gift
        Attention!`,
        message_data: {
          companyName: company.companyName,
          cultivatorName: company.__facilityCultivator__?.name,
          buyerName: surveyDb.__subcompany__.__facilityBuyer__.name,
        },
        transactional_message_id: addPrifixEmail(
          EmailTemplatesEnum.surveyCompanyBuyerBagsOut,
          CONFIG.platform.ENV.toLowerCase(),
        ),
        identifiers: {
          id: CustomerIoDataService.getUserId(
            company.__facilityCultivator__?.id,
          ),
        },
      });
    }

    return this.dataSource.getRepository(SurveyModel).findOne({
      where: {
        id: surveyDb.id,
      },
      relations: relations,
    });
  }

  @Query(() => SurveysModel, {
    description: '@public - surveys',
  })
  @UseGuards(AuthGuardUser)
  async surveysBuyer(
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
        subcompany: {
          facilityBuyer: {
            id: user.__context__.id,
          },
          company: {
            status: In([
              CompanyStatusEnum.Active,
              CompanyStatusEnum.Archived,
              CompanyStatusEnum.Completed,
            ]),
          },
        },
      },
    );
  }

  @Query(() => SurveyModel, {
    description: '@protected - Get survey by ID (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async surveyByIdBuyer(
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
        subcompany: {
          facilityBuyer: {
            id: user.__context__.id,
          },
          company: {
            status: In([
              CompanyStatusEnum.Active,
              CompanyStatusEnum.Archived,
              CompanyStatusEnum.Completed,
            ]),
          },
        },
      },
    );
  }

  @Subscription(() => SurveyModel, {
    name: SubscriptionsEnum.surveyActivated,
    filter: async (
      { [SubscriptionsEnum.surveyActivated]: { facilityId } },
      _,
      context,
    ) => {
      return facilityId === context?.user?.__context__?.id;
    },
    resolve: async ({ [SubscriptionsEnum.surveyActivated]: { id } }) =>
      SurveyModel.findOne({
        where: { id: id || -1 },
      }),
  })
  surveyActivated() {
    return this.redisGraphqlService.asyncIterator<SurveyModel>(
      SubscriptionsEnum.surveyActivated,
    );
  }
}
