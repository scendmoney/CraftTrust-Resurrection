import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubcompanyModel } from './subcompany.model';
import { DataSource, Not } from 'typeorm';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import QueryService from '@common/query';
import { SubcompaniesModel } from './subcompany.dto';
import { CompanyStatusEnum } from '@entities/company/company.enum';
import { CompanyModel } from '@entities/company/company.model';
import {
  CreateSubcompanyInput,
  UpdateSubcompanyInput,
} from './subcompany.input';
import { FacilityModel } from '@entities/facility/facility.model';
import ErrorMsgEnum from '@enums/error';

@Resolver(() => SubcompanyModel)
export class SubcompanyCultivatorResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => SubcompaniesModel, {
    description: '@protected - List of subcompany (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async subcompaniesCultivator(
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
        company: !isFilterCompany
          ? {
              status: Not(CompanyStatusEnum.Draft),
              facilityCultivator: {
                id: user.__context__.id,
              },
            }
          : {
              facilityCultivator: {
                id: user.__context__.id,
              },
            },
      },
    );
  }

  @Query(() => SubcompanyModel, {
    description: '@protected - Get subcompany by ID (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async subcompanyByIdCultivator(
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
        company: {
          status: Not(CompanyStatusEnum.Draft),
          facilityCultivator: {
            id: user.__context__.id,
          },
        },
      },
    );
  }

  @Mutation(() => SubcompanyModel, { description: 'Subcompany creation' })
  @UseGuards(AuthGuardUser)
  async createSubcompanyCultivator(
    @Args('payload', { type: () => CreateSubcompanyInput })
    payload: CreateSubcompanyInput,
    @CurrentCtx() { relations, user },
  ): Promise<SubcompanyModel> {
    const [issetCompany, issetFacility] = await Promise.all([
      this.dataSource.getRepository(CompanyModel).findOne({
        where: {
          id: payload.companyId,
          status: Not(CompanyStatusEnum.Draft),
          facilityCultivator: {
            id: user.__context__.id,
          },
        },
        select: ['id', 'status'],
      }),
      this.dataSource.getRepository(FacilityModel).findOne({
        where: {
          id: payload.facilityBuyerId,
        },
        select: ['id'],
      }),
    ]);

    if (!issetCompany) {
      throw new Error(ErrorMsgEnum.CompanyNotExist);
    }

    if (!issetFacility) {
      throw new Error(ErrorMsgEnum.FacilityNotExist);
    }

    if (
      [CompanyStatusEnum.Completed, CompanyStatusEnum.Archived].includes(
        issetCompany.status,
      )
    ) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    const item = await this.dataSource
      .getRepository(SubcompanyModel)
      .create({
        ...payload,
        facilityBuyer: { id: payload.facilityBuyerId },
        company: { id: payload.companyId },
      })
      .save();

    return this.dataSource.getRepository(SubcompanyModel).findOne({
      where: {
        id: item.id,
      },
      relations,
    });
  }

  @Mutation(() => SubcompanyModel, { description: 'Subcompany update' })
  @UseGuards(AuthGuardUser)
  async updateSubcompanyCultivator(
    @Args('payload', { type: () => UpdateSubcompanyInput })
    payload: UpdateSubcompanyInput,
    @CurrentCtx() { relations, user },
  ): Promise<SubcompanyModel> {
    const [issetCompany, issetFacility, issetSubcompany] = await Promise.all([
      payload.companyId
        ? this.dataSource.getRepository(CompanyModel).findOne({
            where: {
              id: payload.companyId,
              status: Not(CompanyStatusEnum.Draft),
              facilityCultivator: {
                id: user.__context__.id,
              },
            },
            select: ['id', 'status'],
          })
        : null,
      payload.facilityBuyerId
        ? this.dataSource.getRepository(FacilityModel).findOne({
            where: {
              id: payload.facilityBuyerId,
            },
            select: ['id'],
          })
        : null,
      this.dataSource.getRepository(SubcompanyModel).findOne({
        where: {
          id: payload.id,
        },
        select: ['id'],
      }),
    ]);

    if (payload.companyId && !issetCompany) {
      throw new Error(ErrorMsgEnum.CompanyNotExist);
    }

    if (payload.facilityBuyerId && !issetFacility) {
      throw new Error(ErrorMsgEnum.FacilityNotExist);
    }

    if (!issetSubcompany) {
      throw new Error(ErrorMsgEnum.SubcompanyNotExist);
    }

    if (
      [CompanyStatusEnum.Completed, CompanyStatusEnum.Archived].includes(
        issetCompany.status,
      )
    ) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    const item = await this.dataSource
      .getRepository(SubcompanyModel)
      .create({
        ...payload,
        id: issetSubcompany.id,
        facilityBuyer: payload.facilityBuyerId
          ? { id: payload.facilityBuyerId }
          : undefined,
        company: payload.companyId ? { id: payload.companyId } : undefined,
      })
      .save();

    return this.dataSource.getRepository(SubcompanyModel).findOne({
      where: {
        id: item.id,
      },
      relations,
    });
  }

  @Mutation(() => Boolean, { description: 'Subcompany deletion' })
  @UseGuards(AuthGuardUser)
  async deleteSubcompanyCultivator(
    @Args('payload', { type: () => GetIdDTO }) { id }: GetIdDTO,
    @CurrentCtx() { user },
  ): Promise<boolean> {
    const isset = await this.dataSource.getRepository(SubcompanyModel).findOne({
      where: {
        id,
        company: {
          status: Not(CompanyStatusEnum.Draft),
          facilityCultivator: {
            id: user.__context__.id,
          },
        },
      },
      select: ['id'],
      relations: ['company'],
    });

    if (!isset) {
      throw new Error(ErrorMsgEnum.SubcompanyNotExist);
    }

    if (
      [
        CompanyStatusEnum.Active,
        CompanyStatusEnum.Completed,
        CompanyStatusEnum.Archived,
      ].includes(isset.__company__.status)
    ) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    await this.dataSource.getRepository(SubcompanyModel).softRemove([isset]);
    return true;
  }
}
