import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { CompanyStatusEnum } from '@entities/company/company.enum';
import { SurveyModel } from './survey.model';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { SurveysModel } from './survey.dto';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import QueryService from '@common/query';

@Resolver(() => SurveyModel)
export class SurveyCultivatorResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => SurveysModel, {
    description: '@public - surveys cultivator',
  })
  @UseGuards(AuthGuardUser)
  async surveysCultivator(
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
          company: {
            status: Not(CompanyStatusEnum.Draft),
            facilityCultivator: {
              id: user.__context__.id,
            },
          },
        },
      },
    );
  }

  @Query(() => SurveyModel, {
    description: '@protected - Get survey by ID (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async surveyByIdCultivator(
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
          company: {
            status: Not(CompanyStatusEnum.Draft),
            facilityCultivator: {
              id: user.__context__.id,
            },
          },
        },
      },
    );
  }
}
