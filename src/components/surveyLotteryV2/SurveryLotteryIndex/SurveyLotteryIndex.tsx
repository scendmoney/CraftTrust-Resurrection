import { FC } from 'react';
import { Avatar, Button, Fade, Slide } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ISurveyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';

import SurveyLogo from 'components/Survey/SurveyLogo/SurveyLogo';

import styles from './styles';

const SurveryLotteryIndex: FC<{
  surveyByUuid: ISurveyModel;
}> = ({ surveyByUuid }) => {
  const router = useRouter();
  return (
    <Box sx={{ backgroundColor: colors.black }}>
      <Fade in timeout={1200}>
        <Box sx={styles.containerWrapper}>
          <SurveyLogo />

          <Box sx={styles.container}>
            <Box sx={styles.imgWrapper}>
              <Box
                component={'img'}
                src={'/resources/img/survey/packet.png'}
                sx={styles.img}
                alt={'wing'}
                style={{
                  objectFit: 'contain'
                }}
              />

              <Box
                component={'img'}
                src={'/resources/img/survey/star.png'}
                sx={styles.star}
                alt={'star'}
                style={{
                  objectFit: 'contain'
                }}
              />

              <Avatar
                draggable={false}
                src={
                  surveyByUuid.subcompany.facilityBuyer?.asset?.url ||
                  '/resources/svg/placeholder.svg'
                }
                variant={'circular'}
                sx={styles.floatedImg}
                imgProps={{
                  style: {
                    objectFit: 'cover'
                  }
                }}
              />
            </Box>
            <Box sx={styles.contentWrapper}>
              <Typography sx={styles.title} pb={2} fontSize={40}>
                <span> Hey!</span> Would you like to participate in the lottery?
              </Typography>
              <Box sx={styles.subtitle}>
                <Typography fontSize={24}>
                  We will create a HEDERA wallet for you to which we will send free NFT.
                </Typography>
                <Typography fontSize={24}>It won`t take more than 5 minutes</Typography>
              </Box>
            </Box>
          </Box>

          <Slide direction="up" in timeout={1100}>
            <Box sx={styles.stackNextButtonWrapper}>
              <Button sx={styles.stackNextButton} onClick={goToSignIn} fullWidth>
                Take part in the Lottery
              </Button>
            </Box>
          </Slide>
        </Box>
      </Fade>

      <Box
        component={'img'}
        src={'/resources/img/survey/greenBlur.png'}
        sx={styles.imgBlur}
        alt={'greenBlur'}
      />
    </Box>
  );
  function goToSignIn() {
    router.push({
      pathname: '/auth',
      query: {
        uuid: surveyByUuid.uuid,
        name: surveyByUuid.fullName,
        phone: surveyByUuid.phone
      }
    });
  }
};

export default SurveryLotteryIndex;
