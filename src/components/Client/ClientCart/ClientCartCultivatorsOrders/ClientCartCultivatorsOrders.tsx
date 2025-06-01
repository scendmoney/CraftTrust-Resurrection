import { FC } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ICartModel, IGetIdDto, IMutationDeleteCartArgs } from 'graphql/_server';
import DELETE_CART from 'graphql/mutations/deleteCart';
import DeleteIcon from 'resources/iconsMui/DeleteIcon';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import { chatRv } from 'components/LayoutClient/LayoutClientHeader/LayoutClientHeader';

import ClientCartCultivatorsOrder from './ClientCartCultivatorsOrder/ClientCartCultivatorsOrder';
import styles from './styles';

const ClientCartCultivatorsOrders: FC<{ cart: ICartModel }> = ({ cart }) => {
  const client = useApolloClient();
  const { goTo } = useProjectRouter();

  const [deleteCart] = useMutation<{ deleteCart: IGetIdDto }, IMutationDeleteCartArgs>(DELETE_CART);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { isOpen, openModal, closeModal } = useModalState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!cart.cartItems.length) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isMobile && (
        <Box sx={styles.empoyeeTitleWrapper}>
          <AvatarUncontrolled src={cart.facilityCultivator?.asset?.url || undefined} type={48} />
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              {cart.facilityCultivator.displayName}
            </Typography>
          </Box>
        </Box>
      )}
      <Box sx={styles.cultivatorOrderWraper}>
        <Box sx={styles.empoyeeWrapper}>
          {!isMobile && (
            <>
              <Box sx={styles.empoyeeTitleWrapper}>
                <AvatarUncontrolled src={cart.facilityCultivator?.asset?.url || undefined} />
                <Box>
                  <Typography variant="h4" fontWeight={500}>
                    {cart.facilityCultivator.displayName}
                  </Typography>
                </Box>
              </Box>
              <Box sx={styles.buttons}>
                <IconButton sx={styles.iconDelete} onClick={() => openModal()}>
                  <DeleteIcon />
                </IconButton>
                <ButtonUi
                  var={EButtonType.Bordered}
                  onClick={() =>
                    chatRv({
                      isChatOpen: true,
                      chatSid: cart.facilityCultivator.id
                    })
                  }
                >
                  Contact
                </ButtonUi>
                <ButtonUi var={EButtonType.Secondary} onClick={goToCheckout}>
                  Checkout
                </ButtonUi>
              </Box>
            </>
          )}
        </Box>
        {!isMobile && (
          <Box my={2}>
            <Divider />
          </Box>
        )}

        <Box sx={styles.orders}>
          {cart.cartItems.map((cartItem) => (
            <ClientCartCultivatorsOrder cartItem={cartItem} key={cartItem.product.id} />
          ))}
        </Box>
        {isMobile && (
          <Box mb={2}>
            <Divider />
          </Box>
        )}
        <Box sx={styles.totalPrice}>
          <Typography variant="h4" fontWeight={500}>
            Total
          </Typography>
          <Typography variant="h4" fontWeight={500} color="secondary">
            <DollarAmountFormatter value={cart.costProducts} />
          </Typography>
        </Box>
        <DialogUI
          title="Delete cart"
          close={closeModal}
          open={isOpen}
          buttonSubmit={handleDeleteCart}
          buttonSubmitText="Delete"
          isLoading={isLoading}
        >
          <>Do you really want to delete this cart with all products?</>
        </DialogUI>
      </Box>
      {isMobile && (
        <Box sx={styles.buttons}>
          <IconButton sx={styles.iconDelete} onClick={() => openModal()}>
            <DeleteIcon />
          </IconButton>
          <ButtonUi
            var={EButtonType.Bordered}
            onClick={() =>
              chatRv({
                isChatOpen: true,
                chatSid: cart.facilityCultivator.id
              })
            }
            style={{ width: '100%' }}
          >
            Contact
          </ButtonUi>
          <ButtonUi var={EButtonType.Secondary} onClick={goToCheckout} style={{ width: '100%' }}>
            Checkout
          </ButtonUi>
        </Box>
      )}
    </Box>
  );

  async function goToCheckout() {
    if (cart.cartItems.findIndex((item) => item.quantity > item.product.quantityStock) >= 0) {
      toast.error(
        'One of the products has less left in stock than you have in your cart. Update the quantity or remove the product from your cart'
      );
    } else {
      goTo(`checkout/${cart.id}`);
    }
  }

  async function handleDeleteCart() {
    try {
      startLoading();

      await deleteCart({
        variables: {
          payload: {
            id: cart.id
          }
        }
      });

      await client.refetchQueries({
        include: ['carts']
      });

      toast.success('Cart deleted');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default ClientCartCultivatorsOrders;
