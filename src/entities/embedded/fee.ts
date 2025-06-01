import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true, description: 'Fee data' })
export class FeeData {
  @Field(() => Float, { nullable: false, description: 'fee buyer' })
  @Column({
    type: 'numeric',
    name: 'fee_buyer',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  feeBuyer: number;

  @Field(() => Float, { nullable: false, description: 'fee cultivator' })
  @Column({
    type: 'numeric',
    name: 'fee_cultivator',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  feeCultivator: number;
}
