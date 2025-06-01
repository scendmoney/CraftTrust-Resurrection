import { PaymentStatusEnum, PaymentTypeEnum } from 'graphql/_server';

export const orderPaymentTypes = [
  { value: PaymentTypeEnum.Net, label: 'Net' },
  { value: PaymentTypeEnum.PayNow, label: 'Pay Now' },
  { value: PaymentTypeEnum.PayOnDelivery, label: 'Pay On Delivery' }
];

export const orderPaymentStatuses = [
  { value: PaymentStatusEnum.Due, label: 'Due' },
  { value: PaymentStatusEnum.NotPaid, label: 'Not Paid' },
  { value: PaymentStatusEnum.Overdue, label: 'Overdue' },
  { value: PaymentStatusEnum.Paid, label: 'Paid' }
];
