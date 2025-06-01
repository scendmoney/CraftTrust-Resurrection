import { FC } from 'react';
import { Fade, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { colors } from 'mui/theme/colors';
import { TModalStateAction } from 'sharedArchitech/hooks/useModalState/useModalState';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import styles from './styles';

const RequestsPanel: FC<{
  title: string;
  submitButtonText: string;
  cancelButtonText?: string;
  onSubmit(): Promise<void>;
  onReject?: TModalStateAction<number>;
}> = ({ title, submitButtonText, cancelButtonText, onSubmit, onReject }) => {
  return (
    <Fade in unmountOnExit mountOnEnter timeout={1000}>
      <Box sx={styles.container}>
        <Typography variant="subtitle1" color={colors.white}>
          {title}
        </Typography>
        <Box sx={styles.buttons}>
          {cancelButtonText && onReject && (
            <ButtonUi var={EButtonType.GrayBordered} onClick={() => onReject()}>
              {cancelButtonText}
            </ButtonUi>
          )}
          <ButtonUi onClick={onSubmit}>{submitButtonText}</ButtonUi>
        </Box>
      </Box>
    </Fade>
  );
};

export default RequestsPanel;
