import { ChangeEvent, Dispatch, FC, SetStateAction, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useMutation } from '@apollo/client';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, InputBase, Menu, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IMutationUpdateOrderStatusArgs,
  IOrderModel,
  IOrdersDto,
  IQueryOrdersArgs,
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
  ShippingTypeEnum,
  SortDirectionEnum
} from 'graphql/_server';
import UPDATE_ORDER_STATUS from 'graphql/mutations/updateOrderStatus';
import { NEW_ORDERS } from 'graphql/queries/orders';
import { colors } from 'mui/theme/colors';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const OrderNextStep: FC<{
  order: IOrderModel;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}> = ({ order, setCompleted }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const {
    isOpen: isOpenCancel,
    openModal: openModalCancel,
    closeModal: closeModalCancel
  } = useModalState();

  const [updateOrderStatus] = useMutation<
    { updateOrderStatus: IOrderModel },
    IMutationUpdateOrderStatusArgs
  >(UPDATE_ORDER_STATUS);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isOpen, openModal, closeModal } = useModalState();

  const isShowCancelButton =
    (order.status === OrderStatusEnum.New ||
      order.status === OrderStatusEnum.Confirmed ||
      order.status === OrderStatusEnum.WaitingForCarrier ||
      order.status === OrderStatusEnum.WaitingForPickUp) &&
    order.paymentStatus !== PaymentStatusEnum.Paid;

  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);

    if (event.target.value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const [getOrdersAlert] = useLazyQuery<{ orders: IOrdersDto }, IQueryOrdersArgs>(NEW_ORDERS, {
    variables: {
      payload: {
        isCultivator: true,
        filters: [
          {
            columnName: 'status',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: ['New']
          }
        ],
        sorts: [
          {
            columnName: 'id',
            direction: SortDirectionEnum.Desc
          }
        ],
        paginate: {
          skip: 0,
          take: 1
        }
      }
    },
    fetchPolicy: 'network-only'
  });

  const menuUm = useMemo(() => {
    return (
      <>
        <IconButton color="inherit" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem disabled={!isShowCancelButton} onClick={() => openModalCancel()}>
            Cancel Order
          </MenuItem>
        </Menu>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl, code]);

  const stateUm = useMemo(() => {
    if (order.shippingType === ShippingTypeEnum.PickUp) {
      if (order.status === OrderStatusEnum.New) {
        if (
          order.paymentStatus === PaymentStatusEnum.NotPaid &&
          order.paymentType === PaymentTypeEnum.PayNow
        ) {
          return {
            text: 'Payment pending',
            buttonText: '',
            onSubmit: () => handleUpdateOrderStatus(OrderStatusEnum.Confirmed)
          };
        } else {
          return {
            text: 'Check and Confirm the Order',
            buttonText: 'Confirm Order',
            onSubmit: () => handleUpdateOrderStatus(OrderStatusEnum.Confirmed)
          };
        }
      }
      if (order.status === OrderStatusEnum.Confirmed) {
        return {
          text: 'Select ID for each Package',
          buttonText: 'Ready for Pick Up',
          onSubmit: () => handleUpdateOrderStatus(OrderStatusEnum.WaitingForPickUp)
        };
      }
      if (order.status === OrderStatusEnum.WaitingForPickUp) {
        return {
          text: 'Waiting for Client to Pick Up',
          buttonText: 'Release Items',
          onSubmit: () => openModal()
        };
      }
    }

    if (order.shippingType === ShippingTypeEnum.Delivery) {
      if (order.status === OrderStatusEnum.New) {
        if (
          order.paymentStatus === PaymentStatusEnum.NotPaid &&
          order.paymentType === PaymentTypeEnum.PayNow
        ) {
          return {
            text: 'Payment pending',
            buttonText: '',
            onSubmit: () => handleUpdateOrderStatus(OrderStatusEnum.Confirmed)
          };
        } else {
          return {
            text: 'Check and Confirm the Order',
            buttonText: 'Confirm Order',
            onSubmit: () => handleUpdateOrderStatus(OrderStatusEnum.Confirmed)
          };
        }
      }
      if (order.status === OrderStatusEnum.Confirmed) {
        return {
          text: 'Select Package for All Items',
          buttonText: 'Ready',
          onSubmit: () => handleUpdateOrderStatus(OrderStatusEnum.WaitingForCarrier)
        };
      }
      if (order.status === OrderStatusEnum.WaitingForCarrier) {
        return {
          text: 'Waiting for Carrier to Pick Up Items',
          buttonText: 'Shipped',
          onSubmit: () => handleUpdateOrderStatus(OrderStatusEnum.Shipped)
        };
      }
      if (order.status === OrderStatusEnum.Shipped) {
        return {
          text: 'Items are being shipped to Client',
          buttonText: 'Complete',
          onSubmit: () => openModal()
        };
      }
    }

    return {
      text: '',
      buttonText: '',
      onSubmit: () => null
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.status]);

  if (order.status === OrderStatusEnum.Completed || order.status === OrderStatusEnum.Cancel) {
    return null;
  }

  return (
    <>
      {isLoading && <Loader />}

      <Box sx={styles.container}>
        <Typography variant="subtitle1" color={colors.white}>
          {stateUm.text}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} color={colors.white}>
          {menuUm}
          {stateUm?.buttonText && (
            <ButtonUi type="submit" onClick={stateUm.onSubmit}>
              {stateUm?.buttonText}
            </ButtonUi>
          )}
        </Box>
      </Box>
      <DialogUI
        title="Confirmation Code"
        close={closeModal}
        open={isOpen}
        buttonSubmit={() =>
          handleUpdateOrderStatus(OrderStatusEnum.Completed, Number(code.join('')))
        }
        buttonSubmitText="Confirm"
        isLoading={isLoading}
      >
        <>
          <Box display="flex" gap={2} pb={2}>
            {code.map((value, index) => (
              <InputBase
                key={index}
                placeholder="0"
                value={value}
                onChange={handleChange(index)}
                inputProps={{
                  maxLength: 1,

                  sx: styles.inputNumber,
                  ref: (el: HTMLInputElement | null) => (inputRefs.current[index] = el)
                }}
              />
            ))}
          </Box>
          <Typography variant="body1" color={colors.gray5}>
            To confirm the order, please request the code from the Contact Person.
          </Typography>
        </>
      </DialogUI>
      <DialogUI
        title="Cancel Order"
        close={closeModalCancel}
        open={isOpenCancel}
        buttonSubmit={handlerCancelOrder}
        buttonCancelText="Back"
        buttonSubmitText="Confirm"
        isLoading={isLoading}
      >
        <>Do you really want to cancel this order?</>
      </DialogUI>
    </>
  );

  async function handleUpdateOrderStatus(type: OrderStatusEnum, key?: number) {
    try {
      if (!type) {
        throw new Error('Error');
      }

      startLoading();

      const response = await updateOrderStatus({
        variables: {
          payload: {
            orderId: order.id,
            status: type as OrderStatusEnum,
            verificationCode: key
          }
        }
      });

      if (!response) {
        return null;
      }
      if (type === OrderStatusEnum.Confirmed || type === OrderStatusEnum.Cancel) {
        await getOrdersAlert();
      }

      if (type === OrderStatusEnum.Completed && response) {
        setCompleted(true);
      }

      toast.success('Order updated');
      if (anchorEl) {
        handleClose();
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }

  async function handlerCancelOrder() {
    try {
      startLoading();
      await updateOrderStatus({
        variables: {
          payload: {
            orderId: order.id,
            status: OrderStatusEnum.Cancel,
            verificationCode: Number(code.join(''))
          }
        }
      });
      toast.success('Order canceled!');
      closeModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default OrderNextStep;
