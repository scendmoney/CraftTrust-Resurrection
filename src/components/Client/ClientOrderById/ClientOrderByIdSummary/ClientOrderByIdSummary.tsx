import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation, useSubscription } from '@apollo/client';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  IMutationCancelOrderBuyerArgs,
  IOrderModel,
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum
} from 'graphql/_server';
import CANCEL_ORDER_BUYER from 'graphql/mutations/cancelOrderBuyer';
import { OPRDER_PAID } from 'graphql/subscriptions/orderPaid';
import { colors } from 'mui/theme/colors';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingPaymentType from 'sharedProject/utils/mappingPaymentType';

import ClientOrderPaymentStatus from 'components/Client/ClientOrders/ClientOrder/ClientOrderPaymentStatus/ClientOrderPaymentStatus';
import ClientOrderPaymentStatusCount from 'components/Client/ClientOrders/ClientOrder/ClientOrderPaymentStatusCount/ClientOrderPaymentStatusCount';
import { chatRv } from 'components/LayoutClient/LayoutClientHeader/LayoutClientHeader';
import Loader from 'components/Loader/Loader';

import ClentOrderSummaryItem from '../ClentOrderSummaryItem/ClentOrderSummaryItem';

import ClientOrderByIdPayWindow from './ClientOrderByIdPayWindow/ClientOrderByIdPayWindow';
import styles from './styles';

const ClientOrderByIdSummary: FC<{
  order: IOrderModel;
  paymentType?: PaymentTypeEnum;
  paymentTypeIcon: JSX.Element | undefined;
  justOrdered: boolean;
}> = ({ order, paymentType, paymentTypeIcon, justOrdered }) => {
  const { clearDynamicQuery, query, router } = useProjectRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { isOpen, openModal, closeModal } = useModalState();
  const {
    isOpen: isOpenCancelOrder,
    openModal: openModalCancelOrder,
    closeModal: closeModalCancelOrder
  } = useModalState();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  const [cancelOrderBuyer] = useMutation<
    { cancelOrderBuyer: IOrderModel },
    IMutationCancelOrderBuyerArgs
  >(CANCEL_ORDER_BUYER);

  const openPay = router.query.status === 'open-pay';

  useEffect(() => {
    if (openPay) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPay]);

  const buttonUm = useMemo(() => {
    if (
      order.status === OrderStatusEnum.Cancel ||
      (order.status === OrderStatusEnum.Completed && order.paymentType !== PaymentTypeEnum.Net)
    ) {
      return null;
    }

    if (
      order.paymentType === PaymentTypeEnum.Net &&
      order.paymentStatus !== PaymentStatusEnum.Paid
    ) {
      return (
        <ButtonUi onClick={() => openModal()} var={EButtonType.Primary} disabled={isSubmitDisabled}>
          {'Pay Now'}
        </ButtonUi>
      );
    }

    if (order.paymentStatus !== PaymentStatusEnum.Paid) {
      return (
        <ButtonUi onClick={() => openModal()} var={EButtonType.Primary} disabled={isSubmitDisabled}>
          {justOrdered ? 'Confirm and Pay' : 'Pay Now'}
        </ButtonUi>
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitDisabled, justOrdered, order.paymentStatus, order.status]);

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

  const isShowCancelButton =
    order.status === OrderStatusEnum.New &&
    (order.paymentStatus === PaymentStatusEnum.NotPaid ||
      order.paymentType === PaymentTypeEnum.Net);

  const client = useApolloClient();

  useSubscription<{ orderPaid: IOrderModel }>(OPRDER_PAID, {
    variables: { orderId: order.id },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.orderPaid.id === order.id) {
        client.refetchQueries({
          include: ['orderById']
        });
        closeModal();
      }
    },
    skip:
      !order.id ||
      order.status === OrderStatusEnum.Cancel ||
      order.status === OrderStatusEnum.Completed
  });

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={styles.wrapper}>
        <Box sx={styles.orderWraper}>
          <Box sx={styles.nameWrapper}>
            <AvatarUncontrolled
              variant="circular"
              src={order.facilityCultivator?.asset?.url || undefined}
              type={64}
            />
            <Typography variant="h4" fontWeight={500}>
              {order.facilityCultivator.displayName}
            </Typography>
          </Box>
          <ButtonUi
            var={EButtonType.Gray}
            onClick={() =>
              chatRv({
                isChatOpen: true,
                chatSid: order.facilityCultivator.id
              })
            }
          >
            Chat
          </ButtonUi>
        </Box>

        <Box sx={styles.orderWraper}>
          <ClentOrderSummaryItem
            label={'Payment'}
            title={mappingPaymentType(paymentType)}
            icon={paymentTypeIcon}
            isIconBordered
          />

          {order.paymentStatus !== PaymentStatusEnum.Paid &&
          order.status !== OrderStatusEnum.Cancel ? (
            <ClientOrderPaymentStatus order={order} showBorder />
          ) : null}

          <Divider />

          {order?.products?.length ? (
            <Box>
              <Box sx={styles.totalWrapper}>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  sx={{ color: colors.gray5, mb: 1 }}
                >
                  Products
                </Typography>
                <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                  <DollarAmountFormatter value={order.total} />
                </Typography>
              </Box>
              <Box sx={styles.totalWrapper}>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  sx={{ color: colors.gray5, mb: 2 }}
                >
                  Platform fee
                </Typography>
                <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                  <DollarAmountFormatter value={order.fee.feeBuyer} />
                </Typography>
              </Box>
              <Box sx={styles.totalWrapper}>
                <Typography variant="h4" sx={{ color: colors.black1 }}>
                  Total
                </Typography>
                <Typography variant="h4" sx={{ color: colors.secondary }}>
                  <DollarAmountFormatter value={order.totalBuyer} />
                </Typography>
              </Box>
            </Box>
          ) : null}

          {buttonUm}

          {isShowCancelButton ? (
            <ButtonUi
              var={EButtonType.Gray}
              onClick={(e) => {
                e.stopPropagation();
                openModalCancelOrder();
              }}
            >
              Cancel Order
            </ButtonUi>
          ) : null}

          {isShowTimerUm ? (
            <ClientOrderPaymentStatusCount
              order={order}
              text="If payment is not received, the order will be canceled in"
              onTimerEnd={() => setIsSubmitDisabled(true)}
            />
          ) : null}

          {order.paymentStatus == PaymentStatusEnum.Paid ? (
            <ClientOrderPaymentStatus showBorder order={order} />
          ) : null}
        </Box>
      </Box>
      {isOpen && (
        <ClientOrderByIdPayWindow
          orderId={order.id}
          isOpen={isOpen}
          closeModal={handleClearQuery}
        />
      )}
      <DialogUI
        title="Cancel Order"
        close={closeModalCancelOrder}
        open={isOpenCancelOrder}
        buttonSubmit={handlerCancelOrder}
        buttonCancelText="Back"
        buttonSubmitText="Confirm"
        isLoading={isLoading}
      >
        <>Do you really want to cancel this order?</>
      </DialogUI>
    </>
  );

  function handleClearQuery() {
    closeModal();
    clearDynamicQuery(
      query?.id
        ? {
            id: query?.id
          }
        : {}
    );
  }
  async function handlerCancelOrder() {
    try {
      startLoading();
      await cancelOrderBuyer({
        variables: {
          payload: {
            id: Number(order.id)
          }
        }
      });
      toast.success('Order canceled!');
      clearDynamicQuery(
        query?.id
          ? {
              id: query?.id
            }
          : {}
      );
      await client.refetchQueries({
        include: ['orders']
      });
      closeModalCancelOrder();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default ClientOrderByIdSummary;
