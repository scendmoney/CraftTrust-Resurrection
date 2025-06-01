import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatusEnum {
  New = 'New',
  Confirmed = 'Confirmed',
  WaitingForPickUp = 'WaitingForPickUp',
  WaitingForCarrier = 'WaitingForCarrier',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancel = 'Cancel',
}

export enum ShippingTypeEnum {
  PickUp = 'PickUp',
  Delivery = 'Delivery',
}

export enum PaymentStatusEnum {
  NotPaid = 'NotPaid',
  Paid = 'Paid',
  Due = 'Due',
  Overdue = 'Overdue',
}

export enum PaymentTypeEnum {
  PayNow = 'PayNow',
  PayOnDelivery = 'PayOnDelivery',
  Net = 'Net',
}

export enum TransactionOrderStatusEnum {
  canceled = 'canceled',
  done = 'done',
  error = 'error',
  new = 'new',
  processing = 'processing',
}

registerEnumType(TransactionOrderStatusEnum, {
  name: 'TransactionOrderStatusEnum',
});
registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });
registerEnumType(ShippingTypeEnum, { name: 'ShippingTypeEnum' });
registerEnumType(PaymentStatusEnum, { name: 'PaymentStatusEnum' });
registerEnumType(PaymentTypeEnum, { name: 'PaymentTypeEnum' });
