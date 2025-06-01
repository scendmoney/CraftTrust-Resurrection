import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';

import styles from './styles';

const AuthWrapper: FC<{ children: ReactElement }> = ({ children }) => {
  return <Box sx={styles.container}>{children}</Box>;
};

export default AuthWrapper;
