import { FC, ReactElement, useEffect } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';

import styles from './styles';

const BluredWrapper: FC<{ children: ReactElement }> = ({ children }) => {
  useEffect(() => {
    toast.warning('Work in progress', { toastId: 'Work in progress' });
  }, []);
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={styles.blur}>{children}</Box>
    </Box>
  );
};
export default BluredWrapper;
