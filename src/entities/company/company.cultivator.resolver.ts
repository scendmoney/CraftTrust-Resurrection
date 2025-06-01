import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CompanyModel } from './company.model';
import { DataSource, DeepPartial, FindOptionsWhere, Not } from 'typeorm';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import QueryService from '@common/query';
import { CompaniesModel, CompanyInsightsModel } from './company.dto';
import { CompanyStatusEnum } from './company.enum';
import { UpdateCompanyCultivatorInput } from './company.input';
import ErrorMsgEnum from '@enums/error';
import CompanyInsightViewModel from './company.insight.view.model';
import moment from 'moment';
import { ProductModel } from '@entities/product/product.model';
import merge from 'lodash/merge';
import { SortDirectionEnum, SubscriptionsEnum } from '@enums/common';
import { RedisGraphqlService } from 'libs/redis/src';
import { CompanyService } from './company.service';

@Resolver(() => CompanyModel)
export class CompanyCultivatorResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly companyService: CompanyService,
  ) {}

  @Query(() => CompaniesModel, {
    description: '@protected - List of company (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async companiesCultivator(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations, user },
  ): Promise<CompaniesModel> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where: FindOptionsWhere<CompanyModel> =
      QueryService.getFilters(filters);

    if (!where.status) {
      where.status = Not(CompanyStatusEnum.Draft);
    }

    const [items, total] = await this.dataSource
      .getRepository(CompanyModel)
      .findAndCount({
        order,
        where: {
          ...merge(where, {
            facilityCultivator: {
              id: user.__context__?.id || -1,
            },
          }),
        },
        ...paginate,
        relations,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => CompanyModel, {
    description: '@protected - Get company by ID (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async companyByIdCultivator(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations, user },
  ): Promise<CompanyModel> {
    return QueryService.item<CompanyModel>(
      this.dataSource.getRepository(CompanyModel),
      {
        payload,
        relations,
      },
      {
        status: Not(CompanyStatusEnum.Draft),
        facilityCultivator: {
          id: user.__context__?.id || -1,
        },
        id: payload.id,
      },
    );
  }

  @Mutation(() => CompanyModel, {
    description: 'Company update (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async updateCompanyCultivator(
    @Args('payload', { type: () => UpdateCompanyCultivatorInput })
    payload: UpdateCompanyCultivatorInput,
    @CurrentCtx() { relations },
  ): Promise<CompanyModel> {
    const [issetCompany, productSurvey] = await Promise.all([
      this.dataSource.getRepository(CompanyModel).findOne({
        where: { id: payload.id },
        select: ['id', 'status', 'dateEnd', 'dateStart'],
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

    if (payload.status) {
      switch (issetCompany.status) {
        case CompanyStatusEnum.Pending: {
          if (
            ![
              CompanyStatusEnum.Active,
              CompanyStatusEnum.Completed,
              CompanyStatusEnum.Rejected,
              CompanyStatusEnum.Archived,
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

    if (payload.productSurveyId && !productSurvey) {
      throw new Error(ErrorMsgEnum.ProductSurveyNotExist);
    }

    if (
      issetCompany.dateEnd &&
      moment(issetCompany.dateEnd).format('YYYY-MM-DD') <=
        moment().format('YYYY-MM-DD') &&
      payload.status === CompanyStatusEnum.Active
    ) {
      throw new Error(ErrorMsgEnum.InvalidDate);
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

    const item = await this.dataSource
      .getRepository(CompanyModel)
      .create(data)
      .save();

    const result = await this.dataSource.getRepository(CompanyModel).findOne({
      where: {
        id: item.id,
      },
      relations,
    });

    if (
      ((Object.keys(payload).includes('dateStart') &&
        result.status === CompanyStatusEnum.Active) ||
        (Object.keys(payload).includes('status') &&
          result.status === CompanyStatusEnum.Active)) &&
      result.dateStart === moment().format('YYYY-MM-DD')
    ) {
      await this.companyService.sendCompanyEmail(result.id);
    }

    return result;
  }

  @Query(() => CompanyInsightsModel, {
    description: '@protected - Get Company Insights (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async companyInsightsCultivator(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user },
  ): Promise<CompanyInsightsModel> {
    return QueryService.list<CompanyInsightsModel>(
      this.dataSource.getRepository(CompanyInsightViewModel),
      {
        payload,
        relations: [],
      },
      {
        facilityCultivatorId: user.__context__.id,
      },
    );
  }

  @Subscription(() => CompanyModel, {
    name: SubscriptionsEnum.companyCultivatorWaitingConfirmation,
    filter: (
      {
        [SubscriptionsEnum.companyCultivatorWaitingConfirmation]: {
          facilityId,
        },
      },
      _,
      context,
    ) => {
      return facilityId === context?.user?.__context__?.id;
    },
    resolve: async ({
      [SubscriptionsEnum.companyCultivatorWaitingConfirmation]: { id },
    }) =>
      CompanyModel.findOne({
        where: { id: id || -1 },
      }),
  })
  companyCultivatorWaitingConfirmation() {
    return this.redisGraphqlService.asyncIterator<CompanyModel>(
      SubscriptionsEnum.companyCultivatorWaitingConfirmation,
    );
  }
}
