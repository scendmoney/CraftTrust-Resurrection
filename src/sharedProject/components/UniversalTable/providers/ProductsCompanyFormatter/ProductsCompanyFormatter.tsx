import { ComponentType, memo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IProductModel } from 'graphql/_server';

import styles from './styles';

const ProductsCompanyFormatter:
  | ComponentType<{
      products: undefined | null | IProductModel[];
    }>
  | undefined = ({ products }) => {
  if (!products || products?.length === 0) {
    return <>-</>;
  }

  if (products?.length > 1) {
    return (
      <Box sx={styles.container}>
        <Typography variant="body1" fontWeight={500}>
          {products.map((item) => `#${item.id}`).join(', ')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="body1" fontWeight={500}>
        #{products[0]?.item?.id || '-'}
      </Typography>
    </Box>
  );
};

export default memo(ProductsCompanyFormatter);
