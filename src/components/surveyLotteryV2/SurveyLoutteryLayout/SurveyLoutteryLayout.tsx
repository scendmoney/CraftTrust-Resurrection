import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

import LandingLogo from 'components/Landing/LayoutLandingHeader/shared/LandingLogo/LandingLogo';

import styles from './styles';

const SurveyLoutteryLayout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <LandingLogo />
      </Box>

      <Box mt={11} sx={styles.title}>
        <Typography fontSize={40} color={colors.white}>
          Join
          <span> NFT Lottery </span> and win 1 lb
        </Typography>
      </Box>

      <Box sx={styles.form} mt={4}>
        {children}
      </Box>
    </Box>
  );
};

export default SurveyLoutteryLayout;
