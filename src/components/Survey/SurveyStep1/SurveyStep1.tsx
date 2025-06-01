import { Dispatch, FC, SetStateAction } from 'react';
import { Avatar, Button, Fade, Slide } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ISurveyModel } from 'graphql/_server';

import SurveyLogo from '../SurveyLogo/SurveyLogo';

import styles from './styles';

const SurveyStep1: FC<{
  surveyByUuid: ISurveyModel;
  setStep: Dispatch<SetStateAction<'step1' | 'step1-add' | 'step2' | 'step3'>>;
}> = ({ surveyByUuid, setStep }) => {
  return (
    <>
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
                <span> Woohoo!</span> Unlock more rewards right now!
              </Typography>
              <Typography sx={styles.subtitle} fontSize={24}>
                Grab your weed and let&apos;s go!
              </Typography>
            </Box>
          </Box>

          <Slide direction="up" in timeout={1100}>
            <Box sx={styles.stackNextButtonWrapper}>
              <Button sx={styles.stackNextButton} onClick={goToStep2} fullWidth>
                GO
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
    </>
  );
  function goToStep2() {
    setStep('step1-add');
  }
};

export default SurveyStep1;
