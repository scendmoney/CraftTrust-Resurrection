import { FC } from 'react';
import Box from '@mui/material/Box';
import { IOrderModel, OrderStatusEnum } from 'graphql/_server';

import OrderItem from './OrderItem/OrderItem';
import OrderItemWithPackageId from './OrderItemWithPackageId/OrderItemWithPackageId';
import styles from './styles';

const OrderItems: FC<{ order: IOrderModel }> = ({ order }) => {
  if (
    order?.status === OrderStatusEnum.Confirmed ||
    order?.status === OrderStatusEnum.WaitingForPickUp
  ) {
    return (
      <Box sx={styles.items} mt={2}>
        {order?.products?.map((item) => {
          return <OrderItemWithPackageId key={item.id} item={item} />;
        })}
      </Box>
    );
  }
  return (
    <Box sx={styles.items} mt={2}>
      {order?.products?.map((item) => {
        return <OrderItem key={item.id} item={item} />;
      })}
    </Box>
  );
};

export default OrderItems;
