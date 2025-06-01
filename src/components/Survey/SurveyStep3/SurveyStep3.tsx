import { FC, useState } from 'react';
import { Fade, Grow, Slide } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ISurveyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import LogoIcon from 'resources/iconsMui/LogoIcon';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';

import SurveyLogo from '../SurveyLogo/SurveyLogo';

import styles from './styles';

const SurveyStep3: FC<{ surveyByUuid: ISurveyModel; id: number }> = ({ surveyByUuid, id }) => {
  const [unlock, setUnlock] = useState(false);
  const router = useRouter();
  return (
    <Fade in timeout={1200}>
      <Box sx={styles.wrapper}>
        <SurveyLogo />

        <Box sx={styles.container}>
          <Box sx={styles.contentWrapper}>
            <Typography sx={styles.subtitle} variant="inherit" fontSize={48}>
              UNLOCKED
            </Typography>
            {unlock ? (
              <Grow in timeout={2500}>
                <Box sx={styles.question}>
                  <Typography variant="h3" fontSize={36}>
                    Check your sms messages for a QR code and show it to your budtender
                    {surveyByUuid?.fullName ? `, ${surveyByUuid?.fullName}` : ''}
                  </Typography>

                  <Typography variant="body1">Or you can check it in your wallet</Typography>
                  <ButtonUi fullWidth onClick={() => router.push('/wallet/')}>
                    Go to Wallet
                  </ButtonUi>
                </Box>
              </Grow>
            ) : (
              <Slide direction="up" in mountOnEnter unmountOnExit timeout={1500}>
                <Box sx={styles.unlocked} onClick={() => setUnlock(true)}>
                  <Box sx={styles.logoWrapper}>
                    <LogoIcon fill={colors.black} sx={{ width: '147px', height: '135px' }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight={500} fontSize="32px">
                      Tap to get
                    </Typography>
                    <Typography variant="h3" fontWeight={500} fontSize="32px">
                      Top-Shelf Voucher
                    </Typography>
                  </Box>
                </Box>
              </Slide>
            )}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default SurveyStep3;
