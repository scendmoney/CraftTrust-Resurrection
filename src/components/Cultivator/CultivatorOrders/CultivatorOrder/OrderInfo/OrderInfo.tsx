import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { AccountBalanceWalletOutlined } from '@mui/icons-material';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Divider, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IOrderModel, PaymentStatusEnum, PaymentTypeEnum, ShippingTypeEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import NetIcon from 'resources/iconsMui/NetIcon';
import NftIcon from 'resources/iconsMui/NftIcon';
import OrderIcon from 'resources/iconsMui/OrderIcon';
import DeliveryIcon from 'resources/iconsMui/orderStatuses/DeliveryIcon';
import PickUpIcon from 'resources/iconsMui/orderStatuses/PickUpIcon';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import NftDetails from 'sharedProject/components/NftDetails/NftDetails';
import { getOrderStatusIcon, mappingOrderStatus } from 'sharedProject/utils/mappingOrderStatus';

import OrderInfoLeftItem from './OrderInfoLeftItem/OrderInfoLeftItem';
import styles from './styles';

const OrderInfo: FC<{ order: IOrderModel; openChat: Dispatch<SetStateAction<boolean>> }> = ({
  order,
  openChat
}) => {
  const { isOpen, openModal, closeModal } = useModalState();
  const isMobile = useMediaQuery('(max-width:1050px)');

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
        icon: <NetIcon htmlColor={colors.secondary} />,
        label: 'Net'
      };
    }

    if (order.paymentType === PaymentTypeEnum.PayNow) {
      return {
        icon: <AccountBalanceWalletOutlined htmlColor={colors.secondary} />,
        label: 'Pay Now'
      };
    }

    if (order.paymentType === PaymentTypeEnum.PayOnDelivery) {
      return {
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
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Box sx={styles.title}>
          <Typography variant="h4" fontWeight={500}>
            {order.id}
          </Typography>
          <OrderIcon htmlColor={colors.secondary} />
        </Box>

        <Box sx={styles.status}>
          {getOrderStatusIcon(order.status)}
          <Typography>{mappingOrderStatus(order.status)}</Typography>
        </Box>
        <Box sx={styles.buttonsWrapper}>
          {order.ipfs && order.paymentStatus === PaymentStatusEnum.Paid ? (
            <Box>
              <ButtonUi
                var={EButtonType.Text}
                style={{ color: colors.secondary }}
                onClick={() => openModal()}
                startIcon={<NftIcon fill={colors.secondary} />}
              >
                Show NFT
              </ButtonUi>
              <Box py={1}>
                <Divider orientation="vertical" />
              </Box>
            </Box>
          ) : null}
          {order.facilityBuyer?.id && isMobile ? (
            <Box>
              <ButtonUi
                var={EButtonType.Text}
                style={{ color: colors.secondary }}
                onClick={() => openChat(true)}
                startIcon={<ChatIcon />}
              >
                Open Chat
              </ButtonUi>
            </Box>
          ) : null}
        </Box>
      </Box>

      <OrderInfoLeftItem
        label={'Client'}
        title={order.facilityBuyer?.displayName}
        avatarSrc={order.facilityBuyer?.asset?.url || '/resources/svg/placeholder.svg'}
      />
      <Divider />
      <OrderInfoLeftItem
        label={'Shipping'}
        title={shippingTypeUm.label}
        icon={shippingTypeUm.icon}
      />
      <Divider />
      <OrderInfoLeftItem
        label={'Payment Status'}
        title={paymentTypeUm.label}
        icon={paymentTypeUm.icon}
      />
      <Divider />

      {order?.paymentDate && (
        <>
          <OrderInfoLeftItem
            label={'Payment Date'}
            title={formatDateTimeDateFns(order?.paymentDate, true)}
            icon={<QueryBuilderIcon htmlColor={colors.secondary} />}
          />
          <Divider />
        </>
      )}

      <OrderInfoLeftItem
        label={'Created Date'}
        title={formatDateTimeDateFns(order.dates?.createdDate)}
        icon={<QueryBuilderIcon htmlColor={colors.secondary} />}
      />
      {isOpen && <NftDetails isOpen={isOpen} closeModal={closeModal} orderId={order.id} />}
    </Box>
  );
};

export default OrderInfo;
