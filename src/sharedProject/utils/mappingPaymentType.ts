import { PaymentTypeEnum } from 'graphql/_server';

const mappingPaymentType = (oldMessage?: PaymentTypeEnum | undefined): string => {
  switch (oldMessage) {
    case PaymentTypeEnum.PayOnDelivery:
      return 'Pay on Delivery';
    case PaymentTypeEnum.PayNow:
      return 'Pay Now';
    case PaymentTypeEnum.Net:
      return 'NET';
    default:
      return '--';
  }
};

export default mappingPaymentType;
