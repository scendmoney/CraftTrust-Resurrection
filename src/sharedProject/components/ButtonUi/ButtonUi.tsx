import { FC, useMemo } from 'react';
import Button from '@mui/material/Button';

import styles from './styles';
import { IProps } from './types';

const ButtonUi: FC<IProps> = (props) => {
  const stylesUm = useMemo(() => {
    return styles(props);
  }, [props]);
  return (
    <Button sx={stylesUm} {...props}>
      {props.children}
    </Button>
  );
};

export default ButtonUi;
