import { ComponentType, memo, ReactElement } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import styles from './styles';

const IconAvatarNameFormatter:
  | ComponentType<{
      icon: ReactElement;
      name: string | undefined | null;
    }>
  | undefined = ({ name, icon }) => {
  return (
    <Box sx={styles.container}>
      {icon}
      <Typography variant="body1" fontWeight={500}>
        {name || '--'}
      </Typography>
    </Box>
  );
};

export default memo(IconAvatarNameFormatter);
