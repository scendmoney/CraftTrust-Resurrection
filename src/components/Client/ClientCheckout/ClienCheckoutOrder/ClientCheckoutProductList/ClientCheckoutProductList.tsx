import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ICartItemModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import ProductPriceOutOfStock from 'components/Client/ClientCart/ClientCartCultivatorsOrders/ClientCartCultivatorsOrder/ProductPriceOutOfStock/ProductPriceOutOfStock';

import styles from './styles';

const ClientCheckoutProductList: FC<{
  cartItem: ICartItemModel;
}> = ({ cartItem }) => {
  return (
    <Box sx={styles.productWrapper}>
      <Box>
        <AvatarUncontrolled
          src={cartItem.product?.thumbnail?.url || '/resources/svg/placeholder.svg'}
          variant="rounded"
          isGrayBackground
        />
      </Box>
      <Box sx={styles.productInfoWrapper}>
        <Box sx={styles.productName}>
          <ProductPriceOutOfStock cartItem={cartItem} />
          <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.black1 }}>
            {cartItem.product.item.name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" fontWeight={500} sx={{ color: colors.black1 }}>
              <DollarAmountFormatter value={cartItem.total} />
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray5 }}>
              {cartItem.quantity} lb
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientCheckoutProductList;
