import { FC, useMemo } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrderModel, OrderStatusEnum, PaymentStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import CompletedIcon from 'resources/iconsMui/orderStatuses/CompletedIcon';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';

import styles from './styles';

const ClientOrderPaymentStatus: FC<{ order: IOrderModel; showBorder?: boolean }> = ({
  order,
  showBorder = false
}) => {
  const stylesUm = useMemo(() => {
    return styles(order.paymentStatus, showBorder);
  }, [order.paymentStatus, showBorder]);

  const statusUm = useMemo(() => {
    if (order.paymentStatus === PaymentStatusEnum.NotPaid && order.status === OrderStatusEnum.New) {
      return {
        icon: null,
        text: null
      };
    }
    if (order.paymentStatus === PaymentStatusEnum.NotPaid) {
      return {
        icon: <ErrorOutlineOutlinedIcon htmlColor={colors.orange} />,
        text: 'Order not Paid'
      };
    }
    if (order.paymentStatus === PaymentStatusEnum.Paid) {
      return {
        icon: <CompletedIcon htmlColor={colors.green} />,
        text: 'Order Paid'
      };
    }
    if (order.paymentStatus === PaymentStatusEnum.Due) {
      return {
        icon: <ErrorOutlineOutlinedIcon htmlColor={colors.orange} />,
        text: order.paymentDate
          ? `Payment due ${formatDateTimeDateFns(order.paymentDate)}`
          : 'Payment due'
      };
    }
    if (order.paymentStatus === PaymentStatusEnum.Overdue) {
      return {
        icon: <ErrorOutlineOutlinedIcon htmlColor={colors.secondary} />,
        text: order.paymentDate
          ? `Payment overdue! ${formatDateTimeDateFns(order.paymentDate)}`
          : 'Payment overdue!'
      };
    }
    return {
      icon: undefined,
      text: ''
    };
  }, [order.paymentDate, order.paymentStatus, order.status]);

  if (!statusUm.text) {
    return null;
  }

  return (
    <Box sx={stylesUm.container}>
      <Box sx={stylesUm.button}>
        {statusUm.icon}
        <Typography variant="subtitle1" fontWeight={500}>
          {statusUm.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClientOrderPaymentStatus;
