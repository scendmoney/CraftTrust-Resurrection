import { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

import styles from './styles';
import { IProps } from './types';

const AuthBlock: FC<IProps> = ({ children, isShow = false, lessPadding = false }) => {
  const stylesUm = useMemo(() => {
    return styles(lessPadding);
  }, [lessPadding]);
  return (
    <Grow in={isShow} timeout={1000}>
      <Box sx={stylesUm.container}>{children}</Box>
    </Grow>
  );
};

export default AuthBlock;
