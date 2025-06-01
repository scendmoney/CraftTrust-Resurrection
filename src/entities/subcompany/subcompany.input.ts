import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { SubcompanyModel } from './subcompany.model';

@InputType({ description: 'Create Subcompany' })
export class CreateSubcompanyInput extends PickType(
  SubcompanyModel,
  ['quantity'],
  InputType,
) {
  @Field(() => String, { nullable: false })
  facilityBuyerId: string;

  @Field(() => Int, { nullable: false })
  companyId: number;
}

@InputType({ description: 'Create Subcompany' })
export class UpdateSubcompanyInput extends PartialType(
  PickType(SubcompanyModel, ['quantity'], InputType),
  InputType,
) {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: true })
  facilityBuyerId?: string;

  @Field(() => Int, { nullable: false })
  companyId: number;
}
