import { FC } from 'react';
import { Fade, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { colors } from 'mui/theme/colors';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';

import styles from './styles';

const SaveProfilePanel: FC<{ isDirty: boolean }> = ({ isDirty }) => {
  return (
    <Fade in={isDirty} unmountOnExit mountOnEnter timeout={1000}>
      <Box sx={styles.container}>
        <Typography variant="subtitle1" color={colors.white}>
          You have unsaved changes
        </Typography>
        <ButtonUi type="submit">Save Changes</ButtonUi>
      </Box>
    </Fade>
  );
};

export default SaveProfilePanel;
