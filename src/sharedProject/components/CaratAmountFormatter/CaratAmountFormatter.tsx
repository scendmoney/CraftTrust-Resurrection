import { FC } from 'react';
import { NumericFormat } from 'react-number-format';

const CaratAmountFormatter: FC<{ value: number; showCurrency?: boolean }> = ({
  value,
  showCurrency = true
}) => {
  return (
    <NumericFormat
      value={value}
      displayType={'text'}
      thousandSeparator={','}
      prefix={''}
      suffix={showCurrency ? ' CARAT' : undefined}
      decimalScale={2}
    />
  );
};

export default CaratAmountFormatter;
