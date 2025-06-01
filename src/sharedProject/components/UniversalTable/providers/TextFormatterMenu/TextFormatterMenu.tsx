import { ComponentType, memo } from 'react';
import { Box } from '@mui/material';

import styles from './styles';

const TextFormatterMenu:
  | ComponentType<{
      children?: JSX.Element;
      value: string | undefined | null;
    }>
  | undefined = ({ children, value }) => {
  return (
    <Box sx={styles.container}>
      {children ? children : null}
      {value ? value : '--'}
    </Box>
  );
};

export default memo(TextFormatterMenu);
