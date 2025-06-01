import { FC } from 'react';
import Chip from '@mui/material/Chip';
import { ICartItemModel, ProductStatusEnum } from 'graphql/_server';

const ProductPriceOutOfStock: FC<{ cartItem: ICartItemModel }> = ({ cartItem }) => {
  if (!cartItem) {
    return null;
  }
  if (
    cartItem?.product?.quantityStock === 0 ||
    cartItem?.product?.status !== ProductStatusEnum.Listed
  ) {
    return <Chip label="Out of stock" variant="outlined" size="small" color="error" />;
  }
  if (cartItem.quantity > cartItem?.product?.quantityStock) {
    return (
      <Chip
        label={`Only ${cartItem.product.quantityStock} lb left in stock`}
        variant="outlined"
        size="small"
        color="error"
      />
    );
  }
  return null;
};

export default ProductPriceOutOfStock;
