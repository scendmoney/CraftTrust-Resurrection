import { FC } from 'react';
import Box from '@mui/material/Box';

import styles from './styles';

const MenuLogo: FC<{ isMargin?: boolean }> = ({ isMargin = true }) => {
  return (
    <Box
      m={isMargin ? '24px' : 0}
      component="img"
      sx={styles.logo}
      src="/resources/svg/logoTitle.svg"
      alt="logo"
    />
  );
};

export default MenuLogo;
