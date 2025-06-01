import { FC } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Routes from 'routes';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';

const MenuLogo: FC = () => {
  const { goTo } = useProjectRouter();
  return (
    <Box sx={styles.container} onClick={() => goTo(Routes.CLIENT)}>
      <Box component="img" sx={styles.logo} src="/resources/svg/logo.svg" alt="logo" />
      <Typography sx={styles.title}>CRAFT TRUST</Typography>
    </Box>
  );
};

export default MenuLogo;
