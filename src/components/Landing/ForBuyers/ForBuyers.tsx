import { FC, useRef, useState } from 'react';
import AnimatedCursor from 'react-animated-cursor';
import { Waypoint } from 'react-waypoint';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import { colors } from 'mui/theme/colors';

import data from './data';
import styles from './styles';

const ForBuyers: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width:1050px)');
  const spline2 = useRef<Application | null>(null);

  function onLoad(splineApp: Application) {
    spline2.current = splineApp;
  }

  const [isPlayBenefits, setIsPlayBenefits] = useState<boolean>(false);
  const [isPlaySubtitle, setIsPlaySubtitle] = useState<boolean>(false);
  const [isPlayTitle, setIsPlayTitle] = useState<boolean>(false);
  const [isPlayAnimMobile, setIsPlayAnimMobile] = useState<boolean>(false);

  return (
    <Box sx={styles.buyers}>
      {!isMobile && (
        <AnimatedCursor
          showSystemCursor
          color="24, 212, 88"
          innerSize={0}
          outerSize={12}
          innerScale={1}
          outerScale={2}
          trailingSpeed={16}
          outerAlpha={0}
          innerStyle={{
            backgroundColor: '#18D458'
          }}
          outerStyle={{
            backgroundColor: '#18D458'
            // border: '3px solid #18D458'
          }}
        />
      )}

      {isMobile ? (
        <Waypoint onEnter={() => setIsPlayAnimMobile(true)}>
          <Grow in={isPlayAnimMobile} timeout={3000}>
            <Box
              sx={styles.imgLogo}
              component="img"
              src="/resources/img/mainPage-1.jpg"
              alt="img"
              loading="lazy"
            />
          </Grow>
        </Waypoint>
      ) : (
        <Waypoint onEnter={() => triggerAnimation()}>
          <Box sx={styles.threeJs}>
            <Spline
              scene="https://prod.spline.design/UIEV-Y5g3wmH1YUu/scene.splinecode?v=2"
              onLoad={onLoad}
            />
          </Box>
        </Waypoint>
      )}

      <Waypoint onEnter={() => setIsPlayTitle(true)} bottomOffset="300px">
        <Grow in={isPlayTitle} timeout={1000}>
          <Typography sx={styles.description} color={colors.white} variant="inherit">
            <span>CraftTrust Buyers </span>
            find more than just cannabis products; they discover a transparent community and
            marketplace.
          </Typography>
        </Grow>
      </Waypoint>
      <Waypoint onEnter={() => setIsPlaySubtitle(true)} bottomOffset="300px">
        <Box sx={{ pt: 10 }}>
          <Grow in={isPlaySubtitle} timeout={2000}>
            <Typography sx={styles.subtitle}>
              Make informed decisions based on data. Experience a verified authentic supply chain,
              benefit from promotions, and be part of a thriving cannabis marketplace. CraftTrust is
              more than just another cannabis ecommerce website; it&apos;s a dynamic ecosystem of
              buyers and sellers connecting with quality products and an engaged community.
            </Typography>
          </Grow>
        </Box>
      </Waypoint>
      <Waypoint onEnter={() => setIsPlayBenefits(true)} bottomOffset="300px">
        <Box sx={styles.benefits} ref={ref}>
          {data.map((item) => {
            return (
              <Grow in={isPlayBenefits} key={item.id} timeout={item.delay}>
                <Box sx={styles.benefit}>
                  <Box>
                    <Box component="img" src={item.img} />
                  </Box>

                  <Typography color={colors.white} variant="h3" sx={styles.title}>
                    {item.title}
                  </Typography>
                  <Typography color={colors.gray5} variant="body1" sx={styles.caption}>
                    {item.description}
                  </Typography>
                </Box>
              </Grow>
            );
          })}
        </Box>
      </Waypoint>
    </Box>
  );

  function triggerAnimation() {
    if (spline2?.current) {
      // eslint-disable-next-line no-console
      console.log('Spline for Buyers Triggered');
      spline2.current.emitEvent('keyDown', '59d5be3d-ded7-4307-abaf-5b8fe55233fb');
    }
  }
};

export default ForBuyers;
