import { PaymentStatusEnum } from 'graphql/_server';

const mappingPaymentStatus = (oldMessage?: PaymentStatusEnum | undefined): string => {
  switch (oldMessage) {
    case PaymentStatusEnum.Overdue:
      return 'Overdue!';
    case PaymentStatusEnum.NotPaid:
      return 'Not Paid';
    case PaymentStatusEnum.Paid:
      return 'Paid';
    case PaymentStatusEnum.Due:
      return 'Due';
    default:
      return '--';
  }
};

export default mappingPaymentStatus;
