import { FC } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { colors } from 'mui/theme/colors';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import styles from './styles';

const ClientFaq: FC = () => {
  return (
    <Box sx={styles.faqWrapper}>
      <Typography variant="h3" fontWeight={500}>
        FAQ
      </Typography>
      <Typography variant="subtitle1" sx={{ color: colors.gray5 }}>
        How to Cancel Order
      </Typography>
      <Typography variant="subtitle1" sx={{ color: colors.gray5 }}>
        Optional next generation leverage
      </Typography>
      <Typography variant="subtitle1" sx={{ color: colors.gray5 }}>
        Right-sized demand-driven model
      </Typography>
      <Typography variant="subtitle1" sx={{ color: colors.gray5 }}>
        Distributed fault-tolerant benchmark
      </Typography>
      <Typography variant="subtitle1" sx={{ color: colors.gray5 }}>
        Digitized disintermediate process improvement
      </Typography>
      <ButtonUi var={EButtonType.Gray}>Contact Support</ButtonUi>
    </Box>
  );
};

export default ClientFaq;
