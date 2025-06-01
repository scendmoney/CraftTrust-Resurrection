import { FC, useMemo } from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrderModel, PaymentStatusEnum } from 'graphql/_server';

import styles from './styles';

const OrderPaymentStatus: FC<{ order: IOrderModel }> = ({ order }) => {
  const stylesUm = useMemo(() => {
    return styles(order.paymentStatus);
  }, [order.paymentStatus]);

  const statusUm = useMemo(() => {
    if (order.paymentStatus === PaymentStatusEnum.NotPaid) {
      return {
        icon: <ErrorOutlineOutlinedIcon />,
        text: 'Order not Paid'
      };
    }
    if (order.paymentStatus === PaymentStatusEnum.Paid) {
      return {
        icon: <CheckCircleOutlineOutlinedIcon />,
        text: 'Order Paid'
      };
    }
    if (order.paymentStatus === PaymentStatusEnum.Due) {
      return {
        icon: <CheckCircleOutlineOutlinedIcon />,
        text: 'Order not paid (Due).'
      };
    }
    if (order.paymentStatus === PaymentStatusEnum.Overdue) {
      return {
        icon: <CheckCircleOutlineOutlinedIcon />,
        text: 'Order not paid (Overdue).'
      };
    }
    return {
      icon: undefined,
      text: ''
    };
  }, [order.paymentStatus]);

  return (
    <Box sx={stylesUm.container}>
      {statusUm.icon}
      <Typography variant="subtitle1" fontWeight={500}>
        {statusUm.text}
      </Typography>
    </Box>
  );
};

export default OrderPaymentStatus;
