import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { OrderStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import CompletedIcon from 'resources/iconsMui/orderStatuses/CompletedIcon';
import ConfirmedIcon from 'resources/iconsMui/orderStatuses/ConfirmedIcon';
import DeliveryIcon from 'resources/iconsMui/orderStatuses/DeliveryIcon';
import NewOrderIcon from 'resources/iconsMui/orderStatuses/NewOrderIcon';
import WaitingIcon from 'resources/iconsMui/orderStatuses/WaitingIcon';
import PickUpIcon from 'resources/iconsMui/PickUpIcon';

const orderStatusMap: { [key in OrderStatusEnum]?: string } = {
  [OrderStatusEnum.Cancel]: 'Canceled',
  [OrderStatusEnum.Completed]: 'Completed',
  [OrderStatusEnum.Confirmed]: 'Confirmed',
  [OrderStatusEnum.New]: 'New',
  [OrderStatusEnum.Shipped]: 'Shipped',
  [OrderStatusEnum.WaitingForCarrier]: 'Waiting For Carrier',
  [OrderStatusEnum.WaitingForPickUp]: 'Waiting For PickUp'
};

export const getOrderStatusIcon = (status: string) => {
  switch (status) {
    case OrderStatusEnum.New:
      return <NewOrderIcon htmlColor={colors.green} />;
    case OrderStatusEnum.Confirmed:
      return <ConfirmedIcon htmlColor={colors.green} />;
    case OrderStatusEnum.WaitingForCarrier:
      return <WaitingIcon htmlColor={colors.orange} />;
    case OrderStatusEnum.WaitingForPickUp:
      return <PickUpIcon htmlColor={colors.orange} />;
    case OrderStatusEnum.Shipped:
      return <DeliveryIcon htmlColor={colors.orange} />;
    case OrderStatusEnum.Completed:
      return <CompletedIcon htmlColor={colors.gray5} />;
    case OrderStatusEnum.Cancel:
      return <NotInterestedIcon htmlColor={colors.gray5} />;
    default:
      return null;
  }
};

export const mappingOrderStatus = (oldMessage: OrderStatusEnum): string =>
  orderStatusMap[oldMessage] ?? '--';

export const orderStatuses = Object.entries(orderStatusMap).map(([value, label]) => ({
  value,
  label
}));
