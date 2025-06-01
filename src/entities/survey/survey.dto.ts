import { Field, ObjectType } from '@nestjs/graphql';
import { SurveyModel } from './survey.model';
import { PaginateModel } from '@common/query/query.dto';

@ObjectType({ isAbstract: true, description: 'Surveys' })
export class SurveysModel {
  @Field(() => [SurveyModel], { nullable: false })
  items: SurveyModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
