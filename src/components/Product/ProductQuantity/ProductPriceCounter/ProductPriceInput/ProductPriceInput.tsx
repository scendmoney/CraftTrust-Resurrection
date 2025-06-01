import { FC, memo, ReactElement, useMemo } from 'react';
import InputBase from '@mui/material/InputBase';

import styles from './styles';
import IProps from './types';

const ProductPriceInput: FC<IProps> = ({ ...props }): ReactElement => {
  const stylesUm = useMemo(() => {
    return styles();
  }, []);
  return <InputBase sx={stylesUm.input} type="text" autoComplete="off" {...props} />;
};

export default memo(ProductPriceInput);
