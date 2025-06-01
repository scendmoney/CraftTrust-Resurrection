import { Args, Query, Resolver } from '@nestjs/graphql';
import { CompanyModel } from './company.model';
import { DataSource, FindOptionsWhere, In } from 'typeorm';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import QueryService from '@common/query';
import { CompaniesModel, CompanyInsightsModel } from './company.dto';
import { CompanyStatusEnum } from './company.enum';
import { SortDirectionEnum } from '@enums/common';
import merge from 'lodash/merge';
import CompanyInsightBuyerViewModel from './company.insight.buyer.view.model';

@Resolver(() => CompanyModel)
export class CompanyBuyerResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => CompaniesModel, {
    description: '@protected - List of company (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async companiesBuyer(
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

    const statuses = [
      CompanyStatusEnum.Active,
      CompanyStatusEnum.Archived,
      CompanyStatusEnum.Completed,
    ];
    if (!where.status) {
      where.status = In(statuses);
    }

    const [items, total] = await this.dataSource
      .getRepository(CompanyModel)
      .findAndCount({
        order,
        where: {
          ...merge(where, {
            subcompanies: {
              facilityBuyer: {
                id: user.__context__.id,
              },
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
    description: '@protected - Get company by ID (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async companyByIdBuyer(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { user },
  ): Promise<CompanyModel> {
    return QueryService.item<CompanyModel>(
      this.dataSource.getRepository(CompanyModel),
      {
        payload,
        relations: [],
      },
      {
        status: In([
          CompanyStatusEnum.Active,
          CompanyStatusEnum.Archived,
          CompanyStatusEnum.Completed,
        ]),
        subcompanies: {
          facilityBuyer: {
            id: user.__context__.id,
          },
        },
        id: payload.id,
      },
    );
  }

  @Query(() => CompanyInsightsModel, {
    description: '@protected - Get Company Insights (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async companyInsightsBuyer(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user },
  ): Promise<CompanyInsightsModel> {
    return QueryService.list<CompanyInsightsModel>(
      this.dataSource.getRepository(CompanyInsightBuyerViewModel),
      {
        payload,
        relations: [],
      },
      {
        facilityBuyerId: user.__context__.id,
      },
    );
  }
}
