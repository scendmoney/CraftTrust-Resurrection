import { FC, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

import ContactUsForm from './ContactUsForm/ContactUsForm';
import SignUpForm from './SignUpForm/SignUpForm';
import styles from './styles';

const Footer: FC = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const [anchorElSignUp, setAnchorElSignUp] = useState<null | HTMLElement>(null);
  const [anchorElContactUs, setAnchorElContactUs] = useState<null | HTMLElement>(null);

  const openSignUp = Boolean(anchorElSignUp);
  const openContactUs = Boolean(anchorElContactUs);

  const handleOpenSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSignUp(event.currentTarget);
  };
  const handleCloseSignUp = () => {
    setAnchorElSignUp(null);
  };

  const handleOpenContactUs = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElContactUs(event.currentTarget);
  };
  const handleCloseContactUs = () => {
    setAnchorElContactUs(null);
  };

  return (
    <Waypoint onEnter={() => setIsPlay(true)} bottomOffset="200px">
      <Grow in={isPlay} timeout={2000}>
        <Box sx={styles.footer}>
          <Box sx={styles.footerContent}>
            <Typography color={colors.white} sx={styles.title}>
              Early Access
            </Typography>
            <Box sx={styles.footerTitle}>
              <Typography color={colors.gray5} sx={styles.caption}>
                Get ahead of the curve with CraftTrust&apos;s Early Access. Be among the first to
                experience your Cannabis Business Dashboard, the future of commercial cannabis.
              </Typography>
              <Typography color={colors.gray5} sx={styles.caption}>
                Early access participants enjoy exclusive benefits, insights, and a front-row seat
                to the evolution of digital cannabis markets.
              </Typography>
              <Box sx={styles.buttons}>
                <Button sx={styles.button1} onClick={handleOpenSignUp}>
                  Get Started
                </Button>
                <ButtonBase sx={styles.button2} onClick={handleOpenContactUs}>
                  Contact Us
                </ButtonBase>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.benefits}>
            <Box flexGrow={1}>
              <Typography variant="inherit" color={colors.gray5}>
                © {new Date().getFullYear()} CraftTrust
              </Typography>
            </Box>
            <Box>
              <Typography color={colors.gray5} variant="inherit">
                <a href="tel:641-919-9630">641-919-9630</a>
              </Typography>
            </Box>
            <Box>
              <Typography color={colors.gray5} variant="inherit">
                <a href="email:contact@crafttrust.com">contact@crafttrust.com</a>
              </Typography>
            </Box>
          </Box>
          <SignUpForm close={handleCloseSignUp} open={openSignUp} />
          <ContactUsForm close={handleCloseContactUs} open={openContactUs} />
        </Box>
      </Grow>
    </Waypoint>
  );
};

export default Footer;
