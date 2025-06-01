import { FC } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import styles from './styles';

const SurveyLogo: FC = () => {
  return (
    <Box sx={styles.containerWrapper}>
      <Box sx={styles.container}>
        <Box component="img" src="/resources/svg/logo.svg" sx={styles.logo} />
        <Typography variant="inherit" sx={styles.text}>
          CRAFT
          <br />
          TRUST
        </Typography>
      </Box>
    </Box>
  );
};

export default SurveyLogo;
