import { ComponentType, memo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { OrderStatusEnum } from 'graphql/_server';
import { getOrderStatusIcon } from 'sharedProject/utils/mappingOrderStatus';

import styles from './styles';

const OrderIdFormatter:
  | ComponentType<{
      status: OrderStatusEnum;
      id: string | undefined | null;
    }>
  | undefined = ({ status, id }) => {
  return (
    <Box sx={styles.container}>
      {getOrderStatusIcon(status)}
      <Typography variant="body1" fontWeight={500}>
        {id || '--'}
      </Typography>
    </Box>
  );
};

export default memo(OrderIdFormatter);
