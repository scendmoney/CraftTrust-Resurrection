import { FC, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ICartModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import Routes from 'routes';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import ClientCheckoutProductList from './ClientCheckoutProductList/ClientCheckoutProductList';
import styles from './styles';

const ClientCheckoutOrder: FC<{ cart: ICartModel; isLoading: boolean }> = ({ cart, isLoading }) => {
  const router = useRouter();
  useEffect(() => {
    if (cart.cartItems.length === 0) {
      toast('Shopping cart is empty. Please select items and create your order again');
      router.push(Routes.CLIENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.cartItems.length]);

  const isQuantityEnoughUm = useMemo(() => {
    return cart.cartItems.findIndex((item) => item.quantity > item.product.quantityStock) === -1;
  }, [cart.cartItems]);

  return (
    <Box sx={styles.orderWraper}>
      <Box sx={styles.nameWrapper}>
        <AvatarUncontrolled src={cart.facilityCultivator?.asset?.url || undefined} />
        <Typography variant="h4" fontWeight={500}>
          {cart.facilityCultivator.displayName}
        </Typography>
      </Box>
      <Divider />
      {cart.cartItems.map((cartItem, index) => (
        <ClientCheckoutProductList cartItem={cartItem} key={index} />
      ))}
      <Box>
        <Box sx={styles.totalWrapper}>
          <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5, mb: 1 }}>
            Products
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
            <DollarAmountFormatter value={cart.costProducts} />
          </Typography>
        </Box>
        <Box sx={styles.totalWrapper}>
          <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5, mb: 2 }}>
            Platform fee
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
            <DollarAmountFormatter value={cart.fee} />
          </Typography>
        </Box>
        <Box sx={styles.totalWrapper}>
          <Typography variant="h4" sx={{ color: colors.black1 }}>
            Total
          </Typography>
          <Typography variant="h4" sx={{ color: colors.secondary }}>
            <DollarAmountFormatter value={cart.total} />
          </Typography>
        </Box>
      </Box>
      {!isQuantityEnoughUm && (
        <ButtonUi
          var={EButtonType.Primary}
          onClick={() => router.push(Routes.CLIENT_CART)}
          disabled={isLoading}
        >
          Edit Quantity in Cart
        </ButtonUi>
      )}
      <ButtonUi var={EButtonType.Primary} type="submit" disabled={isLoading || !isQuantityEnoughUm}>
        Confirm
      </ButtonUi>
    </Box>
  );
};

export default ClientCheckoutOrder;
