import { ComponentType, memo } from 'react';
import { Avatar, AvatarGroup, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrderProductModel } from 'graphql/_server';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';

const ProductsFormatter:
  | ComponentType<{
      products: undefined | null | IOrderProductModel[];
    }>
  | undefined = ({ products }) => {
  if (!products || products?.length === 0) {
    return <>-</>;
  }

  if (products?.length > 1) {
    return (
      <Box sx={styles.container}>
        <AvatarGroup max={4} sx={styles.avatarGroup}>
          {products.map((item) => {
            return (
              <Tooltip key={item.id} title={item?.parentProduct?.item?.name} placement={'bottom'}>
                <Avatar
                  src={item?.parentProduct?.thumbnail?.url || '/resources/svg/placeholder.svg'}
                />
              </Tooltip>
            );
          })}
        </AvatarGroup>
        <Typography variant="body1" fontWeight={500}>
          {products?.length} products
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <AvatarUncontrolled
        type={24}
        src={products[0]?.parentProduct?.thumbnail?.url}
        isGrayBackground
        isAddBorder
      />

      <Typography variant="body1" fontWeight={500}>
        {products[0].parentProduct?.item?.name || '-'}
      </Typography>
    </Box>
  );
};

export default memo(ProductsFormatter);
