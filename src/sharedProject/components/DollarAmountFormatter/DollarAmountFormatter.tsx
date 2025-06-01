import { FC } from 'react';
import { NumericFormat } from 'react-number-format';

const DollarAmountFormatter: FC<{ value: number }> = ({ value }) => {
  return (
    <NumericFormat
      value={value}
      displayType={'text'}
      thousandSeparator={','}
      prefix={'$'}
      decimalScale={2}
    />
  );
};

export default DollarAmountFormatter;
