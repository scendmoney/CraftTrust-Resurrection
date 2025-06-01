import { FC, useMemo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrderModel, PaymentTypeEnum, ShippingTypeEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import styles from './styles';

const ClientOrderSummary: FC<{
  order: IOrderModel;
}> = ({ order }) => {
  const paymentUm = useMemo(() => {
    const paymentType = order.paymentType;
    switch (paymentType) {
      case PaymentTypeEnum.PayNow:
        return 'Instant Payment';
      case PaymentTypeEnum.Net:
        return 'Net';
      case PaymentTypeEnum.PayOnDelivery:
        return order.shippingType === ShippingTypeEnum.Delivery
          ? 'Pay on Delivery'
          : 'Pay on Pick-Up';
      default:
        return null;
    }
  }, [order.paymentType, order.shippingType]);
  return (
    <Box sx={styles.info}>
      <Box sx={styles.infoTitle}>
        <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray5 }}>
          Ordered
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {formatDateTimeDateFns(order.dates.createdDate)}
        </Typography>
      </Box>
      {order.shippingType === ShippingTypeEnum.Delivery ? (
        <Box sx={styles.infoTitle}>
          <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray5 }}>
            Delivery Date
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {formatDateTimeDateFns(order.dates.createdDate)}
          </Typography>
        </Box>
      ) : null}

      <Box sx={styles.infoTitle}>
        <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray5 }}>
          {paymentUm}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          <DollarAmountFormatter value={order.totalBuyer} />
        </Typography>
      </Box>
    </Box>
  );
};

export default ClientOrderSummary;
