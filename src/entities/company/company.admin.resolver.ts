import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompanyModel } from './company.model';
import { DataSource, DeepPartial } from 'typeorm';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import ErrorMsgEnum from '@enums/error';
import QueryService from '@common/query';
import { CompaniesModel, CompanyInsightsModel } from './company.dto';
import { CreateCompanyInput, UpdateCompanyInput } from './company.input';
import moment from 'moment';
import { CompanyStatusEnum } from './company.enum';
import { FacilityModel } from '@entities/facility/facility.model';
import { ProductModel } from '@entities/product/product.model';
import CompanyInsightViewModel from './company.insight.view.model';
import { RedisGraphqlService } from 'libs/redis/src';
import { EmailTemplatesEnum, SubscriptionsEnum } from '@enums/common';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { addPrifixEmail } from '@src/utils/utils';
import { CONFIG } from '@config/index';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';

@Resolver(() => CompanyModel)
export class CompanyAdminResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly customerioService: CustomerioService,
  ) {}

  @Query(() => CompaniesModel, {
    description: '@protected - List of company (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async companiesAdmin(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<CompaniesModel> {
    return QueryService.list<CompaniesModel>(
      this.dataSource.getRepository(CompanyModel),
      {
        payload,
        relations,
      },
    );
  }

  @Query(() => CompanyModel, {
    description: '@protected - Get company by ID (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async companyByIdAdmin(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations },
  ): Promise<CompanyModel> {
    return QueryService.item<CompanyModel>(
      this.dataSource.getRepository(CompanyModel),
      {
        payload: {
          filters: [
            {
              columnName: 'id',
              operation: 'equal',
              type: 'number',
              value: [payload.id.toString()],
            },
          ],
        },
        relations,
      },
    );
  }

  @Mutation(() => CompanyModel, { description: 'Company creation' })
  @UseGuards(AuthGuardAdmin)
  async createCompanyAdmin(
    @Args('payload', { type: () => CreateCompanyInput })
    payload: CreateCompanyInput,
    @CurrentCtx() { relations },
  ): Promise<CompanyModel> {
    if (
      payload.dateEnd < payload.dateStart ||
      payload.dateStart < moment().format('YYYY-MM-DD')
    ) {
      throw new Error(ErrorMsgEnum.InvalidDate);
    }

    const [issetFacility, productSurvey] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).findOne({
        where: { id: payload.facilityCultivatorId },
        select: ['id'],
      }),
      this.dataSource.getRepository(ProductModel).findOne({
        where: {
          id: payload.productSurveyId,
          facility: { id: payload.facilityCultivatorId },
        },
        select: ['id'],
      }),
    ]);

    if (!productSurvey) {
      throw new Error(ErrorMsgEnum.ProductSurveyNotExist);
    }

    if (!issetFacility) throw new Error(ErrorMsgEnum.FacilityNotExist);

    const item = await this.dataSource
      .getRepository(CompanyModel)
      .create({
        ...payload,
        facilityCultivator: { id: payload.facilityCultivatorId },
        productSurvey: {
          id: payload.productSurveyId,
        },
      })
      .save();

    return this.dataSource.getRepository(CompanyModel).findOne({
      where: {
        id: item.id,
      },
      relations,
    });
  }

  @Mutation(() => CompanyModel, { description: 'Company update' })
  @UseGuards(AuthGuardAdmin)
  async updateCompanyAdmin(
    @Args('payload', { type: () => UpdateCompanyInput })
    payload: UpdateCompanyInput,
    @CurrentCtx() { relations },
  ): Promise<CompanyModel> {
    const [issetCompany, productSurvey] = await Promise.all([
      this.dataSource.getRepository(CompanyModel).findOne({
        where: { id: payload.id },
        select: ['id', 'status', 'dateEnd', 'dateStart'],
        relations: ['facilityCultivator'],
      }),
      payload.productSurveyId
        ? this.dataSource.getRepository(ProductModel).findOne({
            where: { id: payload.productSurveyId },
            select: ['id'],
          })
        : null,
    ]);

    if (!issetCompany) {
      throw new Error(ErrorMsgEnum.CompanyNotExist);
    }

    if (payload.productSurveyId && !productSurvey) {
      throw new Error(ErrorMsgEnum.ProductSurveyNotExist);
    }

    if (payload.status) {
      switch (issetCompany.status) {
        case CompanyStatusEnum.Draft: {
          if (
            ![
              CompanyStatusEnum.Pending,
              CompanyStatusEnum.Archived,
              CompanyStatusEnum.Completed,
            ].includes(payload.status)
          ) {
            throw new Error(ErrorMsgEnum.CompanyStatusWrong);
          }
          break;
        }
        case CompanyStatusEnum.Pending: {
          if (
            ![
              CompanyStatusEnum.Archived,
              CompanyStatusEnum.Draft,
              CompanyStatusEnum.Completed,
            ].includes(payload.status)
          ) {
            throw new Error(ErrorMsgEnum.CompanyStatusWrong);
          }
          break;
        }
        case CompanyStatusEnum.Rejected: {
          if (
            ![
              CompanyStatusEnum.Pending,
              CompanyStatusEnum.Draft,
              CompanyStatusEnum.Archived,
              CompanyStatusEnum.Completed,
            ].includes(payload.status)
          ) {
            throw new Error(ErrorMsgEnum.CompanyStatusWrong);
          }
          break;
        }
        case CompanyStatusEnum.Completed: {
          if (![CompanyStatusEnum.Archived].includes(payload.status)) {
            throw new Error(ErrorMsgEnum.CompanyStatusWrong);
          }
          break;
        }
        case CompanyStatusEnum.Active: {
          if (
            ![CompanyStatusEnum.Archived, CompanyStatusEnum.Completed].includes(
              payload.status,
            )
          ) {
            throw new Error(ErrorMsgEnum.CompanyStatusWrong);
          }
          break;
        }
        default:
          throw new Error(ErrorMsgEnum.CompanyStatusWrong);
      }
    }

    const data: DeepPartial<CompanyModel> = {
      ...payload,
      id: issetCompany.id,
    };

    if (
      ![
        CompanyStatusEnum.Draft,
        CompanyStatusEnum.Pending,
        CompanyStatusEnum.Rejected,
      ].includes(issetCompany.status)
    ) {
      delete data.unitWeight;
    }

    const payloadKeys = Object.keys(payload);

    if (payload.productSurveyId) {
      data.productSurvey = {
        id: payload.productSurveyId,
      };
    } else if (payloadKeys.includes('productSurveyId')) {
      data.productSurvey = null;
    }

    if (
      Object.keys(payload).includes('dateEnd') ||
      Object.keys(payload).includes('dateStart')
    ) {
      const dates = {
        ...issetCompany,
        ...payload,
      };

      if (
        dates.dateEnd < dates.dateStart ||
        dates.dateStart < moment().format('YYYY-MM-DD')
      ) {
        throw new Error(ErrorMsgEnum.InvalidDate);
      }
    }

    const item = await this.dataSource
      .getRepository(CompanyModel)
      .create(data)
      .save();

    const result = await this.dataSource.getRepository(CompanyModel).findOne({
      where: {
        id: item.id,
      },
      relations: [...relations, 'facilityCultivator.owner'],
    });

    if (payload.status === CompanyStatusEnum.Pending) {
      const cultivatorEmail =
        result.__facilityCultivator__?.campaignEmail ||
        result.__facilityCultivator__?.__owner__?.email;
      await Promise.all([
        this.redisGraphqlService.publish(
          SubscriptionsEnum.companyCultivatorWaitingConfirmation,
          {
            [SubscriptionsEnum.companyCultivatorWaitingConfirmation]: {
              id: data.id,
              facilityId: issetCompany.__facilityCultivator__?.id,
            },
          },
        ),
        this.customerioService.sendEmail({
          to: cultivatorEmail,
          subject: `Campaign is waiting for Approval`,
          message_data: {
            companyName: result.companyName,
            cultivatorName: result.__facilityCultivator__?.name,
          },
          transactional_message_id: addPrifixEmail(
            EmailTemplatesEnum.surveyCompanyIsWaitingApproval,
            CONFIG.platform.ENV.toLowerCase(),
          ),
          identifiers: {
            id: CustomerIoDataService.getUserId(
              result.__facilityCultivator__?.id,
            ),
          },
        }),
      ]);
    }

    return result;
  }

  @Query(() => CompanyInsightsModel, {
    description: '@protected - Get Company Insights (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async companyInsightsAdmin(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
  ): Promise<CompanyInsightsModel> {
    return QueryService.list<CompanyInsightsModel>(
      this.dataSource.getRepository(CompanyInsightViewModel),
      {
        payload,
        relations: [],
      },
    );
  }
}
