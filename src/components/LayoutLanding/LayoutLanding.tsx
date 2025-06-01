import { FC, ReactElement } from 'react';
import { Box } from '@mui/material';

import styles from './styles';

const LayoutLanding: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box sx={styles.container}>
      <Box component="main" sx={styles.children}>
        {children}
      </Box>
    </Box>
  );
};

export default LayoutLanding;
