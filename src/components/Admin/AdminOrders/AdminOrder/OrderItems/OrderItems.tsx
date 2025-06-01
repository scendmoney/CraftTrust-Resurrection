import { FC } from 'react';
import Box from '@mui/material/Box';
import { IOrderModel } from 'graphql/_server';

import OrderItem from './OrderItem/OrderItem';
import styles from './styles';

const OrderItems: FC<{ order: IOrderModel }> = ({ order }) => {
  return (
    <Box sx={styles.items} mt={2}>
      {order?.products?.map((item) => {
        return <OrderItem key={item.id} item={item} />;
      })}
    </Box>
  );
};

export default OrderItems;
