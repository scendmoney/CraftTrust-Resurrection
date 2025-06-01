import { FC, memo, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, ButtonBase, IconButton, Slide, SwipeableDrawer } from '@mui/material';
import useScrollPositionDebounced from 'sharedArchitech/hooks/useScrollPositionDebounced/useScrollPositionDebounced';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';

import { ILandingRefs } from 'components/Landing/Landing';

import LandingLogo from '../shared/LandingLogo/LandingLogo';

import styles from './styles';
const LayoutClientHeaderMobile: FC<{ refs: ILandingRefs }> = ({ refs }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPositionDebounced(500);
  return (
    <>
      <Box sx={styles.header}>
        <Slide in={scrolled < 500} timeout={1000}>
          <Box>
            <LandingLogo />
          </Box>
        </Slide>
        <Box display="flex" justifyContent={'flex-end'}>
          <IconButton
            sx={styles.iconButton}
            color="inherit"
            onClick={(event) => {
              event.stopPropagation();
              setMobileOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <SwipeableDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={(event) => {
          event.stopPropagation();
          setMobileOpen(false);
        }}
        sx={styles.drawerMobile}
        onOpen={() => setMobileOpen(true)}
        anchor="right"
        disableScrollLock
      >
        <>
          <ModalCloseButtonUi onClose={() => setMobileOpen(false)} />
          <Box sx={styles.headerMenu}>
            <ButtonBase onClick={() => handleGoToTop()}>Platform</ButtonBase>
            <ButtonBase onClick={() => handleScroll('refCultivators')}>Cultivators</ButtonBase>
            <ButtonBase onClick={() => handleScroll('refBuyers')}>Buyers</ButtonBase>
            <ButtonBase onClick={() => handleScroll('refEarlyAccess')}>Early Access</ButtonBase>
          </Box>
        </>
      </SwipeableDrawer>
    </>
  );
  function handleScroll(type: keyof ILandingRefs) {
    refs[type].current?.scrollIntoView();
    setMobileOpen(false);
  }
  function handleGoToTop() {
    if (window) {
      window.scrollTo(0, 0);
      setMobileOpen(false);
    }
  }
};

export default memo(LayoutClientHeaderMobile);
