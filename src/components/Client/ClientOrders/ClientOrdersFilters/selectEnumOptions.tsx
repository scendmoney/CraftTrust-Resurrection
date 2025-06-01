import { PaymentStatusEnum } from 'graphql/_server';

export const orderPaymentStatuses = [
  { value: PaymentStatusEnum.Due, label: 'Due' },
  { value: PaymentStatusEnum.NotPaid, label: 'Not Paid' },
  { value: PaymentStatusEnum.Overdue, label: 'Overdue' },
  { value: PaymentStatusEnum.Paid, label: 'Paid' }
];
