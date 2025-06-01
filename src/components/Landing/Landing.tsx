import { FC, MutableRefObject, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import AboutPlatform from './AboutPlatform/AboutPlatform';
import Footer from './Footer/Footer';
import ForBuyers from './ForBuyers/ForBuyers';
import ForCultivators from './ForCultivators/ForCultivators';
import HeroDescription from './HeroDescription/HeroDescription';
import HeroMobileDescription from './HeroMobileDescription/HeroMobileDescription';
import HeroTitle from './HeroTitle/HeroTitle';
import HeroTitleMobile from './HeroTitleMobile/HeroTitleMobile';
import HeroVideo from './HeroVideo/HeroVideo';
import LayoutLandingHeader from './LayoutLandingHeader/LayoutLandingHeader';
import MainAnimation from './MainAnimation/MainAnimation';
import styles from './styles';

export interface ILandingRefs {
  refCultivators: MutableRefObject<HTMLDivElement | null>;
  refBuyers: MutableRefObject<HTMLDivElement | null>;
  refEarlyAccess: MutableRefObject<HTMLDivElement | null>;
}

const Landing: FC = () => {
  const refCultivators = useRef<null | HTMLDivElement>(null);
  const refBuyers = useRef<null | HTMLDivElement>(null);
  const refEarlyAccess = useRef<null | HTMLDivElement>(null);
  const revealEffectRef = useRef<null | HTMLDivElement>(null);
  const logoRef = useRef<null | HTMLDivElement>(null);

  const videoRef = useRef<null | HTMLVideoElement>(null);
  const mobileVid1Ref = useRef<null | HTMLVideoElement>(null);
  const mobileVid2Ref = useRef<null | HTMLVideoElement>(null);

  const isMobile = useMediaQuery('(max-width:1050px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
      // if (mobileVid1Ref.current) {
      //   mobileVid1Ref.current.play();
      // }
      if (revealEffectRef?.current && logoRef?.current) {
        revealEffectRef.current.style.display = 'none';
        logoRef.current.style.display = 'none';
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (document && window) {
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset';
        window.scrollTo(0, 0);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Box sx={styles.reveal} ref={revealEffectRef} />

      <Box sx={styles.logo} ref={logoRef} component="img" src="resources/svg/logo.svg" />

      <LayoutLandingHeader
        refs={{
          refCultivators,
          refBuyers,
          refEarlyAccess
        }}
      />

      {isMobile ? (
        <Box sx={styles.mobileContainer}>
          <Box
            sx={{ minHeight: '60vh' }}
            ref={mobileVid1Ref}
            component="video"
            src={'/resources/heroMobileVideo1.mp4'}
            controls={false}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
          <HeroTitleMobile />
          <Box
            sx={{ minHeight: '60vh' }}
            ref={mobileVid2Ref}
            component="video"
            src={'/resources/heroMobileVideo2.mp4'}
            controls={false}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
          <HeroMobileDescription />
        </Box>
      ) : (
        <Box sx={styles.desktopContainer}>
          <Box sx={styles.desktopContainerOverlay} />
          <HeroVideo videoRef={videoRef} />
          <HeroTitle />
          <MainAnimation />
          <HeroDescription />
        </Box>
      )}

      <Box>
        <AboutPlatform />
      </Box>

      <Box ref={refCultivators}>
        <ForCultivators />
      </Box>

      <Box ref={refBuyers}>
        <ForBuyers />
      </Box>

      <Box ref={refEarlyAccess}>
        <Footer />
      </Box>
    </>
  );
};

export default Landing;
