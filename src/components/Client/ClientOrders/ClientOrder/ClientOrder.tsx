import { FC, useMemo } from 'react';
import {
  Box,
  CardActionArea,
  Divider,
  Fade,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { IOrderModel, OrderStatusEnum, PaymentStatusEnum, PaymentTypeEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import router from 'next/router';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import SecurityIcon from 'resources/iconsMui/SecurityIcon';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { getOrderStatusIcon, mappingOrderStatus } from 'sharedProject/utils/mappingOrderStatus';

import { chatRv } from 'components/LayoutClient/LayoutClientHeader/LayoutClientHeader';

import ClientOrderPaymentStatus from './ClientOrderPaymentStatus/ClientOrderPaymentStatus';
import ClientOrderPaymentStatusCount from './ClientOrderPaymentStatusCount/ClientOrderPaymentStatusCount';
import ClientOrderSummary from './ClientOrderSummary/ClientOrderSummary';
import styles from './styles';

const ClientOrder: FC<{
  order: IOrderModel;
}> = ({ order }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { goTo } = useProjectRouter();
  const handleOpenChat = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    chatRv({
      isChatOpen: true,
      chatSid: order.facilityCultivator.id
    });
  };

  const cancelOrCompletedOrder =
    order.status === OrderStatusEnum.Cancel || order.status === OrderStatusEnum.Completed;
  const cancelOrder = order.status === OrderStatusEnum.Cancel;

  const isShowTimerUm = useMemo(() => {
    if (order.paymentType === PaymentTypeEnum.PayOnDelivery) {
      return false;
    }
    if (order.paymentType === PaymentTypeEnum.Net) {
      return false;
    }
    if (order.paymentStatus === PaymentStatusEnum.NotPaid && order.status === OrderStatusEnum.New) {
      return true;
    }
  }, [order.paymentStatus, order.paymentType, order.status]);

  const isShowPayButtonUm = useMemo(() => {
    return (
      (order.paymentType === PaymentTypeEnum.Net &&
        order.paymentStatus !== PaymentStatusEnum.Paid &&
        order.status !== OrderStatusEnum.Cancel) ||
      (order.paymentStatus === PaymentStatusEnum.NotPaid &&
        order.status !== OrderStatusEnum.Completed &&
        order.status !== OrderStatusEnum.Cancel)
    );
  }, [order.paymentStatus, order.paymentType, order.status]);

  const stylesUm = useMemo(() => {
    return styles(order.paymentStatus, order.status, isShowPayButtonUm);
  }, [order.paymentStatus, order.status, isShowPayButtonUm]);

  return (
    <Fade in timeout={1000}>
      <CardActionArea onClick={() => goTo(`order/${order.id}`)} sx={stylesUm.cardAction}>
        <Box sx={stylesUm.productWrapper}>
          <Box sx={stylesUm.colorWrapper}>
            <Typography variant="body2" fontWeight={500}>
              #{order.id} from {order.facilityCultivator.displayName}
            </Typography>
            <Box sx={stylesUm.headerWrapper}>
              <Box sx={stylesUm.statusWrapper}>
                <Box sx={stylesUm.icon}>{getOrderStatusIcon(order.status)}</Box>

                <Typography variant="subtitle1" fontWeight={500}>
                  {order.status === OrderStatusEnum.Completed &&
                  order.paymentType === PaymentTypeEnum.Net &&
                  order.paymentStatus !== PaymentStatusEnum.Paid
                    ? 'Completed (Not Paid)'
                    : mappingOrderStatus(order.status)}
                </Typography>
              </Box>
              <Box sx={stylesUm.groupWrapper}>
                {!cancelOrCompletedOrder && order?.verificationCode ? (
                  <Box sx={stylesUm.codeWrapper}>
                    <Box sx={stylesUm.icon}>
                      <SecurityIcon fill={colors.green} />
                    </Box>

                    <Typography variant="subtitle1" fontWeight={500}>
                      Confirmation code: {order.verificationCode}
                    </Typography>
                  </Box>
                ) : null}

                {isShowTimerUm ? <ClientOrderPaymentStatusCount order={order} /> : null}

                {!cancelOrder ? <ClientOrderPaymentStatus order={order} /> : null}
                <Box sx={stylesUm.groupDividerWrapper}>
                  {isShowPayButtonUm ? (
                    <ButtonUi
                      onClick={payNow}
                      style={{
                        fontWeight: 400,
                        minWidth: '12vw',
                        width: isMobile ? '100%' : 'auto'
                      }}
                    >
                      Pay Now
                    </ButtonUi>
                  ) : null}
                  {isShowPayButtonUm || !cancelOrder || isShowTimerUm ? (
                    <Box sx={stylesUm.divider}>
                      <Divider orientation="vertical" />
                    </Box>
                  ) : null}
                  <ButtonUi
                    var={EButtonType.White}
                    style={{ minWidth: '6vw', width: isMobile ? '100%' : 'auto' }}
                    startIcon={<ChatIcon fill={colors.black} />}
                    onClick={handleOpenChat}
                  >
                    Chat
                  </ButtonUi>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={stylesUm.orderWrapper}>
            <Box sx={stylesUm.productsWrapper}>
              {order.products?.map((product) => (
                <Box sx={stylesUm.productItem} key={product.id}>
                  <Box>
                    <AvatarUncontrolled
                      src={
                        product?.parentProduct?.thumbnail?.url || '/resources/svg/placeholder.svg'
                      }
                      variant="rounded"
                      isGrayBackground
                      type={48}
                    />
                  </Box>
                  <Box sx={stylesUm.productInfoWrapper}>
                    <Box sx={stylesUm.productName}>
                      <Typography variant="body1" fontWeight={500} sx={{ color: colors.black1 }}>
                        {product?.parentProduct?.item.name}
                      </Typography>
                      <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray5 }}>
                        <DollarAmountFormatter value={product.total} />
                      </Typography>
                      <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray5 }}>
                        {product.quantity} lb
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <ClientOrderSummary order={order} />
          </Box>
        </Box>
      </CardActionArea>
    </Fade>
  );

  async function payNow(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    await router.push({
      pathname: `/client/order/${order.id}`,
      query: { status: 'open-pay' }
    });
  }
};

export default ClientOrder;
