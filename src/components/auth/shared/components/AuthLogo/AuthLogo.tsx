import { FC } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

import styles from './styles';

const AuthLogo: FC = () => {
  return (
    <Grow in timeout={1000}>
      <Box component="img" sx={styles.logo} src="/resources/svg/logo.svg" alt="logo" />
    </Grow>
  );
};

export default AuthLogo;
