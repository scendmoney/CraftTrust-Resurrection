import { ComponentType, memo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrderModel } from 'graphql/_server';

import styles from './styles';

const OrderFormatter:
  | ComponentType<{
      order: undefined | null | IOrderModel;
    }>
  | undefined = ({ order }) => {
  if (!order) {
    return <>-</>;
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="body1" fontWeight={500}>
        #{order?.id}
      </Typography>
    </Box>
  );
};

export default memo(OrderFormatter);
