import { FilterGetDTO } from '@common/query/query.dto';
import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import {
  OrderStatusEnum,
  PaymentTypeEnum,
  ShippingTypeEnum,
} from './order.enum';
import { OrderModel } from './order.model';

@InputType({ description: 'Create Order' })
export class CreateOrderInput extends PartialType(
  PickType(
    OrderModel,
    ['phone', 'zip', 'address', 'city', 'comments'],
    InputType,
  ),
  InputType,
) {
  @Field(() => Int, { nullable: false })
  cartId: number;

  @Field(() => ShippingTypeEnum, { nullable: false })
  shippingType: ShippingTypeEnum;

  @Field(() => PaymentTypeEnum, { nullable: false })
  paymentType: PaymentTypeEnum;

  @Field(() => String, { nullable: false })
  contactPersonId: string;
}

@InputType()
export class FilterOrdersInput extends FilterGetDTO {
  @Field(() => Boolean, { nullable: false })
  isCultivator: boolean;
}

@InputType({ description: 'Update Order Status' })
export class UpdateOrderStatusInput {
  @Field(() => Int, { nullable: false })
  orderId: number;

  @Field(() => OrderStatusEnum, { nullable: false })
  status: OrderStatusEnum;

  @Field(() => Int, { nullable: true })
  verificationCode?: number;
}

@InputType({ description: 'Update Order Package' })
export class UpdateOrderPackageInput {
  @Field(() => Int, { nullable: false })
  orderProductId: number;

  @Field(() => Int, { nullable: false })
  packageId: number;
}
