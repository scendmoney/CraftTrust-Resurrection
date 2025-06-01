import { FC, useMemo } from 'react';
import { AccountBalanceWalletOutlined } from '@mui/icons-material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { CardActionArea, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  IOrderModel,
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
  ShippingTypeEnum
} from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import NetIcon from 'resources/iconsMui/NetIcon';
import NftIcon from 'resources/iconsMui/NftIcon';
import DeliveryIcon from 'resources/iconsMui/orderStatuses/DeliveryIcon';
import PickUpIcon from 'resources/iconsMui/PickUpIcon';
import SecurityIcon from 'resources/iconsMui/SecurityIcon';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import NftDetails from 'sharedProject/components/NftDetails/NftDetails';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { getOrderStatusIcon, mappingOrderStatus } from 'sharedProject/utils/mappingOrderStatus';

import ClentOrderSummaryItem from './ClentOrderSummaryItem/ClentOrderSummaryItem';
import ClientOrderByIdProduct from './ClientOrderByIdProduct/ClientOrderByIdProduct';
import ClientOrderByIdSummary from './ClientOrderByIdSummary/ClientOrderByIdSummary';
import styles from './styles';

const ClientOrderById: FC<{ order: IOrderModel }> = ({ order }) => {
  const { router } = useProjectRouter();
  const { isOpen, openModal, closeModal } = useModalState();
  const justOrdered = router.query.status === 'just-ordered';
  const cancelOrder =
    order.status === OrderStatusEnum.Cancel || order.status === OrderStatusEnum.Completed;

  const titleUm = useMemo(() => {
    if (justOrdered && order.status !== OrderStatusEnum.WaitingForPickUp) {
      return 'Successfully ordered';
    }
    if (justOrdered && order.paymentStatus !== PaymentStatusEnum.Paid) {
      return 'Payment pending';
    }
    if (justOrdered && order.paymentStatus == PaymentStatusEnum.Paid) {
      return 'Successfully ordered';
    }
    return `Order #${order.id}`;
  }, [justOrdered, order.id, order.paymentStatus, order.status]);

  const shippingTypeUm = useMemo(() => {
    if (order.shippingType === ShippingTypeEnum.PickUp) {
      return {
        icon: <PickUpIcon fill={colors.secondary} />,
        label: 'Pick Up'
      };
    }

    if (order.shippingType === ShippingTypeEnum.Delivery) {
      return {
        icon: <DeliveryIcon fill={colors.secondary} />,
        label: 'Delivery'
      };
    }

    return {
      icon: undefined,
      label: ''
    };
  }, [order.shippingType]);

  const paymentTypeUm = useMemo(() => {
    if (order.paymentType === PaymentTypeEnum.Net) {
      return {
        value: PaymentTypeEnum.Net,
        icon: <NetIcon htmlColor={colors.secondary} />,
        label: 'Net Terms'
      };
    }

    if (order.paymentType === PaymentTypeEnum.PayNow) {
      return {
        value: PaymentTypeEnum.PayNow,
        icon: <AccountBalanceWalletOutlined htmlColor={colors.secondary} />,
        label: 'Pay Now'
      };
    }

    if (order.paymentType === PaymentTypeEnum.PayOnDelivery) {
      return {
        value: PaymentTypeEnum.PayOnDelivery,
        icon: <AccountBalanceWalletOutlined htmlColor={colors.secondary} />,
        label: 'Pay On Delivery'
      };
    }

    return {
      icon: undefined,
      label: ''
    };
  }, [order.paymentType]);

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h1">{titleUm}</Typography>
      <Box sx={styles.header}>
        {justOrdered ? (
          <Box sx={styles.codeWrapper}>
            <Typography variant="h4" fontWeight={500} sx={{ color: colors.secondary }}>
              Order #{order.id}
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.statusWrapper}>
            <Box sx={styles.icon}>{getOrderStatusIcon(order.status)}</Box>

            <Typography variant="subtitle1">
              {order.status === OrderStatusEnum.Completed &&
              order.paymentType === PaymentTypeEnum.Net &&
              order.paymentStatus !== PaymentStatusEnum.Paid
                ? 'Completed (Not Paid)'
                : mappingOrderStatus(order.status)}
            </Typography>
          </Box>
        )}
        {order.ipfs && order.paymentStatus === PaymentStatusEnum.Paid ? (
          <CardActionArea onClick={() => openModal()} sx={{ width: 'max-content' }}>
            <Box sx={styles.nftWrapper}>
              <Box sx={styles.nftTitle}>
                <Box sx={styles.icon}>
                  <NftIcon fill={colors.secondary} />
                </Box>
                <Typography variant="subtitle1">Show NFT</Typography>
              </Box>

              <CallMadeIcon htmlColor={colors.gray5} />
            </Box>
          </CardActionArea>
        ) : null}
        {!cancelOrder && order?.verificationCode ? (
          <Box sx={styles.codeWrapper}>
            <Box sx={styles.icon}>
              <SecurityIcon fill={colors.green} />
            </Box>

            <Typography variant="subtitle1">Confirmation code: {order.verificationCode}</Typography>
          </Box>
        ) : null}
        <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
          Created {formatDateTimeDateFns(order.dates.createdDate)}
        </Typography>
      </Box>
      <Box sx={styles.blockWrapper}>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.summary}>
            <ClentOrderSummaryItem
              label={'Shipping'}
              title={shippingTypeUm.label}
              icon={shippingTypeUm.icon}
              isIconBordered
            />

            <Divider flexItem orientation="vertical" />

            <ClentOrderSummaryItem
              label={'Destination'}
              title={order.facilityBuyer.displayName}
              avatarSrc={order.facilityBuyer?.asset?.url || undefined}
              subtitle={`${order.zip ? order.zip : ''} ${order.address ? order.address : ''} ${
                order.city ? order.city : ''
              } ${order.comments ? order.comments : ''}`}
            />

            <Divider flexItem orientation="vertical" />

            <ClentOrderSummaryItem
              label={'Contact Person'}
              title={order.contactPerson?.fullName}
              avatarSrc={order.contactPerson?.asset?.url || undefined}
              subtitle={order.contactPerson?.phoneNumber || ''}
            />
          </Box>
          <Box sx={styles.payment}>
            {order?.products?.map((product) => (
              <ClientOrderByIdProduct key={product.id} product={product} />
            ))}
          </Box>
        </Box>
        <ClientOrderByIdSummary
          justOrdered={justOrdered}
          order={order}
          paymentType={paymentTypeUm.value}
          paymentTypeIcon={paymentTypeUm.icon}
        />
      </Box>
      {isOpen && <NftDetails isOpen={isOpen} closeModal={closeModal} orderId={order.id} />}
    </Box>
  );
};

export default ClientOrderById;
