import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { CompanyModel } from './company.model';

@InputType({ description: 'Create Company' })
export class CreateCompanyInput extends PickType(
  CompanyModel,
  ['dateStart', 'dateEnd', 'companyName', 'unitWeight'],
  InputType,
) {
  @Field(() => String, { nullable: false })
  facilityCultivatorId: string;

  @Field(() => Int, { nullable: false })
  productSurveyId: number;
}

@InputType({ description: 'Update Company' })
export class UpdateCompanyInput extends PartialType(
  PickType(
    CompanyModel,
    ['dateStart', 'dateEnd', 'status', 'companyName', 'unitWeight'],
    InputType,
  ),
  InputType,
) {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => Int, { nullable: true })
  productSurveyId?: number;
}

@InputType({ description: 'Update Company' })
export class UpdateCompanyCultivatorInput extends PartialType(
  PickType(
    CompanyModel,
    ['dateStart', 'dateEnd', 'status', 'companyName', 'unitWeight'],
    InputType,
  ),
  InputType,
) {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => Int, { nullable: true })
  productSurveyId?: number;
}
