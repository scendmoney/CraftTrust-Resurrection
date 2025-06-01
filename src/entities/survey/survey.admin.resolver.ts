import { Args, Query, Resolver } from '@nestjs/graphql';
import { SurveyModel } from './survey.model';
import { CurrentCtx } from '@entities/auth/auth.decorator';

import { DataSource } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import QueryService from '@common/query';
import { SurveysModel } from './survey.dto';

@Resolver(() => SurveyModel)
export class SurveyAdminResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => SurveysModel, {
    description: '@protected - List of Surveys (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async surveysAdmin(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<SurveysModel> {
    return QueryService.list<SurveysModel>(
      this.dataSource.getRepository(SurveyModel),
      {
        payload,
        relations,
      },
    );
  }

  @Query(() => SurveyModel, {
    description: '@protected - Get Survey by ID (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async surveyByIdAdmin(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations },
  ): Promise<SurveyModel> {
    return QueryService.item<SurveyModel>(
      this.dataSource.getRepository(SurveyModel),
      {
        payload,
        relations,
      },
      {
        id: payload.id,
      },
    );
  }
}
