import { FC } from 'react';
import Box from '@mui/material/Box';
import { LabTestingEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ResearchIcon from 'resources/iconsMui/ResearchIcon';

import styles from './styles';

export const ClientProductCardResearchIcon: FC<{ research: LabTestingEnum | undefined }> = ({
  research
}) => {
  switch (research) {
    case LabTestingEnum.TestFailed:
      return null;
    case LabTestingEnum.TestingInProgress ||
      LabTestingEnum.AwaitingConfirmation ||
      LabTestingEnum.SubmittedForTesting ||
      LabTestingEnum.SelectedForRandomTesting:
      return (
        <Box sx={styles.researchIconProgress}>
          <ResearchIcon fill={colors.gray1} stroke="#9B9B9B" />
        </Box>
      );
    case LabTestingEnum.TestPassed || LabTestingEnum.RetestPassed:
      return (
        <Box sx={styles.researchIconTested}>
          <ResearchIcon fill={colors.black} stroke={colors.white} />
        </Box>
      );
    default:
      return null;
  }
};
