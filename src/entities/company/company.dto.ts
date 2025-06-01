import { PaginateModel } from '@common/query/query.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { CompanyModel } from './company.model';
import CompanyInsightViewModel from './company.insight.view.model';

@ObjectType({ isAbstract: true, description: 'Companies' })
export class CompaniesModel {
  @Field(() => [CompanyModel], { nullable: false })
  items: CompanyModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}

@ObjectType({ isAbstract: true, description: 'Company Insights' })
export class CompanyInsightsModel {
  @Field(() => [CompanyInsightViewModel], { nullable: false })
  items: CompanyInsightViewModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
