import { FC, memo, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ICartItemModel } from 'graphql/_server';
import _ from 'lodash';

import styles from './styles';

const ProductPriceCounter: FC<{
  updateCartItemCount(count: number, productId: number): Promise<void>;
  product: ICartItemModel;
}> = ({ updateCartItemCount, product }) => {
  const [count, setCount] = useState(product.quantity);
  const min = product.product.quantityStockMin;
  const max = product.product.quantityStock;

  const debouncedOnValueChange = useRef(
    _.debounce((newValue: number) => {
      updateCartItemCount(newValue, product.product.id);
    }, 1000)
  ).current;

  const handleDecrement = () => {
    if (count > min) {
      const currentCount = count - 0.25;

      setCount(currentCount);
      if (currentCount <= product?.product?.quantityStock) {
        debouncedOnValueChange(currentCount);
      }
    }
  };

  const handleIncrement = () => {
    if (count < max) {
      const currentCount = count + 0.25;
      setCount(currentCount);
      debouncedOnValueChange(currentCount);
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <IconButton onClick={handleDecrement} disabled={count === min} size="small">
        <RemoveIcon />
      </IconButton>
      <Typography variant="subtitle1" fontWeight={500} sx={styles.counter}>
        {count} lb
      </Typography>
      <IconButton
        onClick={handleIncrement}
        disabled={count === max || count + 0.25 > max}
        size="small"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default memo(ProductPriceCounter);
