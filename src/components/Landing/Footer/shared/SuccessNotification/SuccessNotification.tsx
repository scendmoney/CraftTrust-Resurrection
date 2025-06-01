import { FC } from 'react';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Fade } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const SuccessNotification: FC<{
  open: boolean;
  close: (event: React.MouseEvent<HTMLElement, MouseEvent>) => () => void;
  title: string;
  subtitle: string;
}> = ({ open, close, title, subtitle }) => {
  return (
    <Dialog
      sx={styles.dialog}
      open={open}
      onClick={close}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(4px)',
            background: '#00000033'
          }
        }
      }}
    >
      <>
        <IconButton sx={styles.close} type="button" onClick={close}>
          <CloseIcon />
        </IconButton>

        <Fade in timeout={1200}>
          <Box sx={styles.success}>
            <Box sx={styles.ok}>
              <CheckCircleSharpIcon htmlColor={colors.black1} />
            </Box>
            <Typography variant="h3" fontWeight={500}>
              {title}
            </Typography>
            <Box sx={styles.subtitle}>
              <Typography variant="subtitle1" fontWeight={500}>
                {subtitle}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </>
    </Dialog>
  );
};

export default SuccessNotification;
