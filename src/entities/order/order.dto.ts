import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateModel } from '@common/query/query.dto';
import { OrderModel } from './order.model';

@ObjectType({ isAbstract: true, description: 'Orders' })
export class OrdersDTO {
  @Field(() => [OrderModel], { nullable: false })
  items: OrderModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
