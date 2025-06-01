import { Dispatch, FC, SetStateAction } from 'react';
import { Avatar, Button, Grow } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ISurveyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';

import SurveyLogo from '../SurveyLogo/SurveyLogo';

import styles from './styles';

const SurveyStep1Add: FC<{
  surveyByUuid: ISurveyModel;
  setStep: Dispatch<SetStateAction<'step1' | 'step1-add' | 'step2' | 'step3'>>;
}> = ({ surveyByUuid, setStep }) => {
  return (
    <>
      <SurveyLogo />

      <Grow in timeout={1600}>
        <Box sx={styles.containerWrapper}>
          <Box sx={styles.container}>
            <AvatarGroup max={2} sx={styles.avatarGroup}>
              <Avatar
                draggable={false}
                src={
                  surveyByUuid.subcompany.company.productSurvey.thumbnail?.url ||
                  '/resources/svg/placeholder.svg'
                }
                variant={'circular'}
              />
              <Avatar
                draggable={false}
                src={
                  surveyByUuid.subcompany.facilityBuyer?.asset?.url ||
                  '/resources/svg/placeholder.svg'
                }
                variant={'circular'}
              />
            </AvatarGroup>

            <Typography fontSize={32} fontWeight={500} variant="h3">
              Give us some feedback using this app
            </Typography>

            <Typography
              fontSize={20}
              fontWeight={500}
              variant="body2"
              lineHeight={'24px'}
              sx={styles.description}
            >
              Now, consume and rate some of your{' '}
              <span>
                {surveyByUuid?.subcompany?.company?.productSurvey?.item?.name || 'product'}
              </span>
              , and you’ll score some premium compliments of{' '}
              <span>{surveyByUuid?.subcompany.facilityBuyer?.displayName || 'seller'}</span>.
            </Typography>

            <Button fullWidth sx={styles.stackNextButton} onClick={goToStep2}>
              Start
            </Button>

            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              textAlign="center"
              color={colors.green}
            >
              <Typography fontSize={16} fontWeight={500} variant="body2">
                Hey, {surveyByUuid?.fullName}... no cappin`!
              </Typography>

              <Typography fontSize={14} fontWeight={500} variant="body2" color={colors.gray5}>
                (Honest feedback helps us understand and get exactly what you want!)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grow>
    </>
  );
  function goToStep2() {
    setStep('step2');
  }
};

export default SurveyStep1Add;
