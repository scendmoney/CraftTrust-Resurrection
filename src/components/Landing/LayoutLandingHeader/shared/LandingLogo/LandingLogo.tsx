import { FC } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import styles from './styles';

const LandingLogo: FC = () => {
  return (
    <Box sx={styles.container}>
      <Box component="img" src="/resources/svg/logo.svg" sx={styles.logo} />
      <Typography variant="inherit" sx={styles.text}>
        CRAFT
        <br />
        TRUST
      </Typography>
    </Box>
  );
};

export default LandingLogo;
