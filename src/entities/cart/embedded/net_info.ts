import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: false, description: 'Net Info' })
export class NetInfo {
  @Field(() => Boolean, {
    nullable: true,
  })
  isNetActivated?: boolean;

  @Field(() => Int, {
    nullable: true,
  })
  netDays?: number;

  @Field(() => Number, {
    nullable: true,
  })
  netBalance?: number;

  @Field(() => Number, {
    nullable: true,
  })
  dueBalance?: number;
}
