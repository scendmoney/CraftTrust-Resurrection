import { FC, useMemo } from 'react';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import styles from './styles';
import IProps from './types';

const SidebarBottom: FC<IProps> = ({
  children,
  isOpen,
  close,
  isFullwidth = false,
  isSmallWidth = false,
  isOverflowHidden = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const stylesUm = useMemo(() => {
    return styles(isFullwidth, isOverflowHidden, isMobile, isSmallWidth);
  }, [isFullwidth, isOverflowHidden, isMobile, isSmallWidth]);

  return (
    <Drawer
      anchor="bottom"
      variant="temporary"
      sx={stylesUm.drawer}
      open={isOpen}
      onClose={close}
      transitionDuration={600}
      keepMounted
    >
      {isOpen ? children : null}
    </Drawer>
  );
};

export default SidebarBottom;
