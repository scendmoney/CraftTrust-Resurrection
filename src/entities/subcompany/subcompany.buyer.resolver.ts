import { Args, Query, Resolver } from '@nestjs/graphql';
import { SubcompanyModel } from './subcompany.model';
import { DataSource, In } from 'typeorm';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import QueryService from '@common/query';
import { SubcompaniesModel } from './subcompany.dto';
import { CompanyStatusEnum } from '@entities/company/company.enum';

@Resolver(() => SubcompanyModel)
export class SubcompanyBuyerResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => SubcompaniesModel, {
    description: '@protected - List of subcompany (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async subcompaniesBuyer(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations, user },
  ): Promise<SubcompaniesModel> {
    const isFilterCompany = !!payload.filters?.find(
      ({ columnName }) => columnName === 'company.status',
    );
    return QueryService.list<SubcompaniesModel>(
      this.dataSource.getRepository(SubcompanyModel),
      {
        payload,
        relations,
      },
      {
        facilityBuyer: {
          id: user.__context__.id,
        },
        company: !isFilterCompany
          ? {
              status: In([
                CompanyStatusEnum.Active,
                CompanyStatusEnum.Archived,
                CompanyStatusEnum.Completed,
              ]),
            }
          : {},
      },
    );
  }

  @Query(() => SubcompanyModel, {
    description: '@protected - Get subcompany by ID (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async subcompanyByIdBuyer(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations, user },
  ): Promise<SubcompanyModel> {
    return QueryService.item<SubcompanyModel>(
      this.dataSource.getRepository(SubcompanyModel),
      {
        payload,
        relations,
      },
      {
        id: payload.id,
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
    );
  }
}
