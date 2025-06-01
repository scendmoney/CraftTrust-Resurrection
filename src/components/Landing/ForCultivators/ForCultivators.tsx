import { FC, useRef, useState } from 'react';
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

const ForCultivators: FC = () => {
  const spline = useRef<Application | null>(null);

  function onLoad(splineApp: Application) {
    spline.current = splineApp;
  }

  const isMobile = useMediaQuery('(max-width:1050px)');

  const [isPlayBenefits, setIsPlayBenefits] = useState<boolean>(false);
  const [isPlaySubtitle, setIsPlaySubtitle] = useState<boolean>(false);
  const [isPlayTitle, setIsPlayTitle] = useState<boolean>(false);
  const [isPlayAnimMobile, setIsPlayAnimMobile] = useState<boolean>(false);

  return (
    <Box sx={styles.web3}>
      {isMobile ? (
        <Waypoint onEnter={() => setIsPlayAnimMobile(true)}>
          <Grow in={isPlayAnimMobile} timeout={3000}>
            <Box
              sx={styles.imgLogo}
              component="img"
              src="/resources/img/mainPage-2.jpg"
              alt="img"
              loading="lazy"
            />
          </Grow>
        </Waypoint>
      ) : (
        <Waypoint onEnter={() => triggerAnimation()}>
          <Box sx={styles.threeJs}>
            <Spline
              scene="https://prod.spline.design/RS5QfnREUdufaWxz/scene.splinecode?v=2"
              onLoad={onLoad}
            />
          </Box>
        </Waypoint>
      )}

      <Waypoint onEnter={() => setIsPlayTitle(true)} bottomOffset="300px">
        <Grow in={isPlayTitle} timeout={1000}>
          <Typography sx={styles.description} variant="inherit">
            <span>For cultivators,</span> CraftTrust opens doors to unparalleled opportunities to
            market and transact your material.
          </Typography>
        </Grow>
      </Waypoint>
      <Waypoint onEnter={() => setIsPlaySubtitle(true)} bottomOffset="300px">
        <Box sx={{ pt: 10 }}>
          <Grow in={isPlaySubtitle} timeout={2000}>
            <Typography sx={styles.subtitle}>
              Showcase your craft to a wider audience, connect with dispensaries and consumers, and
              gain real-time insights into market trends. Our Cannabis Business Dashboard empowers
              cultivators with visibility, control, and a unique quality validation tool. Craft the
              future of your farm with a platform designed to elevate your market presence and drive
              sales.
            </Typography>
          </Grow>
        </Box>
      </Waypoint>
      <Waypoint onEnter={() => setIsPlayBenefits(true)} bottomOffset="300px">
        <Box sx={styles.benefits}>
          {data.map((item) => {
            return (
              <Grow key={item.id} in={isPlayBenefits} timeout={item.delay}>
                <Box sx={styles.benefit}>
                  <Box>
                    <Box component="img" src={item.img} />
                  </Box>

                  <Typography color={colors.black1} sx={styles.title} variant="h3">
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
    if (spline?.current) {
      // eslint-disable-next-line no-console
      console.log('Spline for Cultivators Triggered');
      spline.current.emitEvent('keyDown', '0a2eead2-0741-4431-89ee-b187baaf413d');
    }
  }
};

export default ForCultivators;
