import { FC } from 'react';
import Box from '@mui/material/Box';

import stylesMui from './stylesMui';
const StartMessage: FC = () => {
  return (
    <Box sx={stylesMui}>
      {/* <Fade in timeout={2000}>
        <Typography variant="subtitle1" color={colors.gray5}>
          Start a dialog by writing your first message
        </Typography>
      </Fade> */}
    </Box>
  );
};

export default StartMessage;
