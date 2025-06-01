import { FC } from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './styles';

const LoaderInline: FC = () => {
  return (
    <Box sx={styles.container}>
      <CircularProgress />
    </Box>
  );
};

export default LoaderInline;
