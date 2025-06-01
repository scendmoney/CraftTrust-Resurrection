import { FC } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IProductModel } from 'graphql/_server';
import FacilityHeaderInfo from 'sharedProject/components/FacilityHeaderInfo/FacilityHeaderInfo';

import Loader from 'components/Loader/Loader';
import ProductLabTested from 'components/Product/ProductLabTested/ProductLabTested';
import ProductQuantity from 'components/Product/ProductQuantity/ProductQuantity';

import styles from './styles';

const AdminCultivatorStorefrontProduct: FC<{
  product: IProductModel;
  loading: boolean;
}> = ({ product, loading }) => {
  if (loading) {
    return <Loader />;
  }
  return (
    <Box>
      <Box sx={styles.product}>
        <Box sx={styles.productWrapper}>
          <Box>
            <Box
              component={'img'}
              src={product?.thumbnail?.url || '/resources/placeholder.png'}
              sx={styles.thumbnail}
              alt={product?.label}
            />
          </Box>

          <Box sx={styles.productContent}>
            {product?.geneticCross && (
              <Typography variant="h3" color="secondary">
                {product?.geneticCross}
              </Typography>
            )}

            <Typography variant="h1">{product?.item?.name}</Typography>
            <Typography variant="subtitle1" my={5} fontWeight={500}>
              {product?.description}
            </Typography>
            <ProductLabTested product={product} />

            <ProductQuantity product={product} isProductAdded={false} />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.facilityContentWrapper}>
        <FacilityHeaderInfo facilityById={product.facility} hideChatButton />
      </Box>
    </Box>
  );
};

export default AdminCultivatorStorefrontProduct;
