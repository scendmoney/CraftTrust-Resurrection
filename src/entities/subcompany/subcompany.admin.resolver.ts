import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubcompanyModel } from './subcompany.model';
import { DataSource } from 'typeorm';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import ErrorMsgEnum from '@enums/error';
import QueryService from '@common/query';
import { SubcompaniesModel } from './subcompany.dto';
import {
  CreateSubcompanyInput,
  UpdateSubcompanyInput,
} from './subcompany.input';
import { CompanyModel } from '@entities/company/company.model';
import { FacilityModel } from '@entities/facility/facility.model';
import { CompanyStatusEnum } from '@entities/company/company.enum';

@Resolver(() => SubcompanyModel)
export class SubcompanyAdminResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => SubcompaniesModel, {
    description: '@protected - List of subcompany (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async subcompaniesAdmin(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<SubcompaniesModel> {
    return QueryService.list<SubcompaniesModel>(
      this.dataSource.getRepository(SubcompanyModel),
      {
        payload,
        relations,
      },
    );
  }

  @Query(() => SubcompanyModel, {
    description: '@protected - Get subcompany by ID (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async subcompanyByIdAdmin(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations },
  ): Promise<SubcompanyModel> {
    return QueryService.item<SubcompanyModel>(
      this.dataSource.getRepository(SubcompanyModel),
      {
        payload,
        relations,
      },
      {
        id: payload.id,
      },
    );
  }

  @Mutation(() => SubcompanyModel, { description: 'Subcompany creation' })
  @UseGuards(AuthGuardAdmin)
  async createSubcompanyAdmin(
    @Args('payload', { type: () => CreateSubcompanyInput })
    payload: CreateSubcompanyInput,
    @CurrentCtx() { relations },
  ): Promise<SubcompanyModel> {
    const [issetCompany, issetFacility] = await Promise.all([
      this.dataSource.getRepository(CompanyModel).findOne({
        where: {
          id: payload.companyId,
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
      ![CompanyStatusEnum.Draft, CompanyStatusEnum.Rejected].includes(
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
  @UseGuards(AuthGuardAdmin)
  async updateSubcompanyAdmin(
    @Args('payload', { type: () => UpdateSubcompanyInput })
    payload: UpdateSubcompanyInput,
    @CurrentCtx() { relations },
  ): Promise<SubcompanyModel> {
    const [issetCompany, issetFacility, issetSubcompany] = await Promise.all([
      payload.companyId
        ? this.dataSource.getRepository(CompanyModel).findOne({
            where: {
              id: payload.companyId,
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
      ![CompanyStatusEnum.Draft, CompanyStatusEnum.Rejected].includes(
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
  @UseGuards(AuthGuardAdmin)
  async deleteSubcompanyAdmin(
    @Args('payload', { type: () => GetIdDTO }) { id }: GetIdDTO,
  ): Promise<boolean> {
    const isset = await this.dataSource
      .getRepository(SubcompanyModel)
      .findOne({ where: { id }, select: ['id'], relations: ['company'] });

    if (!isset) {
      throw new Error(ErrorMsgEnum.SubcompanyNotExist);
    }

    if (
      ![CompanyStatusEnum.Draft, CompanyStatusEnum.Rejected].includes(
        isset.__company__?.status,
      )
    ) {
      throw new Error(ErrorMsgEnum.CompanyStatusWrong);
    }

    await this.dataSource.getRepository(SubcompanyModel).softRemove([isset]);
    return true;
  }
}
