import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { IOrderProductModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import { formatDate } from 'components/Client/ClientProducts/ClientProductsCards/helpers/formatDate';

import styles from './styles';

const ClientOrderByIdProduct: FC<{
  product: IOrderProductModel;
}> = ({ product }) => {
  return (
    <Box sx={styles.productWrapper}>
      <Box>
        <AvatarUncontrolled
          src={product?.parentProduct?.thumbnail?.url || '/resources/svg/placeholder.svg'}
          variant="rounded"
          type={128}
          isGrayBackground
        />
      </Box>

      <Box sx={styles.productInfoWrapper}>
        <Box sx={styles.productName}>
          <Typography variant="h4" fontWeight={500} sx={{ color: colors.black1 }}>
            {product?.parentProduct?.item.name}
          </Typography>
          <Box>
            {product?.parentProduct?.geneticCross && (
              <Typography variant="subtitle1" sx={{ color: colors.gray2 }} fontWeight={500}>
                Genetic Cross: {product?.parentProduct.geneticCross}
              </Typography>
            )}

            {product?.parentProduct?.packagedDate && (
              <Typography variant="subtitle1" sx={{ color: colors.gray2 }} fontWeight={500}>
                Harvest: {formatDate(product?.parentProduct?.packagedDate)}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={styles.productPrice}>
          <Typography variant="h4" fontWeight={500} sx={{ color: colors.gray2 }}>
            {product.quantity}lb
          </Typography>
          <Typography variant="h4" fontWeight={500} sx={{ color: colors.black1 }}>
            <DollarAmountFormatter value={product.total} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientOrderByIdProduct;
