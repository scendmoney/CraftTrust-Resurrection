import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Update Cart' })
export class UpdateCartInput {
  @Field(() => String, { nullable: false })
  cultivatorId: string;

  @Field(() => Int, { nullable: false })
  productId: number;

  @Field(() => Float, { nullable: false })
  quantity: number;
}
