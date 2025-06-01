import { FC, memo, useMemo } from 'react';
import { Box, ButtonBase, Slide } from '@mui/material';
import { useRouter } from 'next/router';
import Routes from 'routes';
import useScrollPositionDebounced from 'sharedArchitech/hooks/useScrollPositionDebounced/useScrollPositionDebounced';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import { ILandingRefs } from 'components/Landing/Landing';

import LandingLogo from '../shared/LandingLogo/LandingLogo';

import styles from './styles';
const LayoutLandingHeaderDesktop: FC<{ refs: ILandingRefs }> = ({ refs }) => {
  const scrolled = useScrollPositionDebounced(500);
  const router = useRouter();
  const isShowBadgeUm = useMemo(() => {
    let innerHeight = 0;
    if (typeof window !== 'undefined') {
      innerHeight = window.innerHeight;
    }
    return scrolled > innerHeight;
  }, [scrolled]);

  return (
    <>
      <Box sx={styles.header}>
        <Slide in={!isShowBadgeUm} timeout={1000}>
          <Box>
            <LandingLogo />
          </Box>
        </Slide>
        <Box sx={styles.headerMenu}>
          <ButtonBase onClick={() => handleGoToTop()}>Platform</ButtonBase>
          <ButtonBase onClick={() => refs.refCultivators.current?.scrollIntoView()}>
            Cultivators
          </ButtonBase>
          <ButtonBase onClick={() => refs.refBuyers.current?.scrollIntoView()}>Buyers</ButtonBase>

          <ButtonBase onClick={() => refs.refEarlyAccess.current?.scrollIntoView()}>
            Early Access
          </ButtonBase>
        </Box>
        <Box sx={styles.right}>
          <ButtonBase onClick={() => handleGoToSignIn()}>Sign In</ButtonBase>
        </Box>
      </Box>
      <Slide direction="left" in={isShowBadgeUm} timeout={1500}>
        <Box sx={styles.badge} component="img" src="/resources/img/verifiedByMetrc.png" />
      </Slide>
    </>
  );

  function handleGoToTop() {
    if (window) {
      window.scrollTo(0, 0);
    }
  }
  function handleGoToSignIn() {
    router.push(Routes.SIGN_IN);
  }
};

export default memo(LayoutLandingHeaderDesktop);
