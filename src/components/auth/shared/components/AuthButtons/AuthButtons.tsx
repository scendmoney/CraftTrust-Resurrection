import { FC } from 'react';
import Box from '@mui/material/Box';

import styles from './styles';
import { IProps } from './types';

const AuthButtons: FC<IProps> = ({ children }) => {
  return <Box sx={styles.container}>{children}</Box>;
};

export default AuthButtons;
