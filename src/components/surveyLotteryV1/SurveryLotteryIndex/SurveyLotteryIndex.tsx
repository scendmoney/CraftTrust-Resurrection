import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';

import SurveyLoutteryLayout from '../SurveyLoutteryLayout/SurveyLoutteryLayout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SurveyLotteryIndex: FC<{ uuid: string }> = ({ uuid }) => {
  const router = useRouter();
  return (
    <SurveyLoutteryLayout>
      <>
        <Box component="img" src="/resources/img/crafttrustnft.png" />
        <Typography variant="body1">
          You will receive a free NFT. At the end of the month we will hold a drawing among all NFT
          owners, the winner will receive 1 LB.
        </Typography>

        <ButtonUi fullWidth onClick={() => router.push('/ratings/lottery/create-wallet')}>
          GET NFT
        </ButtonUi>
      </>
    </SurveyLoutteryLayout>
  );
};

export default SurveyLotteryIndex;
