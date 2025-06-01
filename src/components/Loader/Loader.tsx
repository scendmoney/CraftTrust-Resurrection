import { FC, useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const Loader: FC<{
  isOpen?: boolean;
  zIndex?: number;
  isDarker?: boolean;
  animationDelay?: number;
  color?: string;
}> = ({
  isOpen = true,
  zIndex = 10000,
  isDarker = false,
  animationDelay = 0.5,
  color = colors.primary
}) => {
  const stylesUm = useMemo(() => {
    return styles(animationDelay, color);
  }, [animationDelay, color]);
  return (
    <Backdrop
      open={isOpen}
      sx={{
        zIndex: zIndex,
        backgroundColor: isDarker
          ? {
              background: 'rgb(0 0 0 / 10%)'
            }
          : 'transparent'
      }}
    >
      <CircularProgress sx={stylesUm} color="inherit" />
    </Backdrop>
  );
};

export default Loader;
