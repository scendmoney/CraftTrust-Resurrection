import { FC, useState } from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import roundToQuarter from 'utils/roundToQuarter';

import ProductPriceInput from './ProductPriceInput/ProductPriceInput';
import styles from './styles';

const ProductPriceCounter: FC<{
  min: number;
  max: number;
  count: number;
  setCount: (value: number) => void;
}> = ({ min, max, count, setCount }) => {
  const [innerCount, setInnerCount] = useState(count);

  const handleIncrement = () => {
    if (count < max) {
      const result = count + 0.25;
      setCount(result);
      setInnerCount(result);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      const result = count - 0.25;
      setCount(result);
      setInnerCount(result);
    }
  };

  const handleChange = (data: NumberFormatValues) => {
    if (data.floatValue !== undefined) {
      setInnerCount(data.floatValue);
    }
  };

  const handleOnBlur = (value: number, min: number, max: number) => {
    const result = roundToQuarter(value, min, max);
    setCount(result);
    setInnerCount(result);
  };

  return (
    <Box sx={styles.wrapper}>
      <IconButton onClick={handleDecrement} disabled={count === min} size="small">
        <RemoveIcon />
      </IconButton>

      <NumericFormat
        value={innerCount}
        customInput={ProductPriceInput}
        onBlur={() => {
          handleOnBlur(innerCount, min, max);
        }}
        onValueChange={(data) => handleChange(data)}
        placeholder={`${min} lb`}
        thousandSeparator={true}
        fixedDecimalScale={true}
        suffix=" lb"
      />

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

export default ProductPriceCounter;
