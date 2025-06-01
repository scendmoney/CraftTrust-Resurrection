import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const HeroTitle: FC = () => {
  return (
    <Box sx={styles.title1}>
      <Box sx={{ ...styles.wordAnimation, animationDelay: '2s' }}>
        <Typography variant="h3" color={colors.gray5}>
          Introducing the Cannabis Business
        </Typography>
        <Typography variant="h3" color={colors.gray5}>
          Dashboard with
        </Typography>
      </Box>

      <Box sx={styles.h1}>
        <Box sx={styles.wordContainer}>
          <Box sx={{ ...styles.wordAnimation, animationDelay: '2.5s' }}>Individual Farm</Box>
        </Box>
        <Box sx={styles.wordContainer}>
          <Box sx={{ ...styles.wordAnimation, animationDelay: '2.75s' }}>
            Storefronts <span>and Metrc</span>
          </Box>
        </Box>
        <Box sx={styles.wordContainer} color={colors.green}>
          <Box
            sx={{
              ...styles.wordAnimation,
              animationDelay: '3s',
              pb: '1.5vh'
            }}
          >
            Integration
          </Box>
        </Box>
      </Box>
      <Box sx={{ ...styles.badges, animationDelay: '3.25s' }}>
        <Box sx={styles.badge} component="img" src="/resources/img/metrcWithoutBorder.png" />
        <Box sx={styles.badge} component="img" src="/resources/img/hedera.png" />
        <Box sx={styles.badge} component="img" src="/resources/img/hashgraph.png" />
      </Box>
    </Box>
  );
};

export default HeroTitle;
