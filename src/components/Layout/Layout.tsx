import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Script from 'next/script';
import useAuth from 'sharedProject/hooks/useAuth';

import LayoutAdmin from 'components/LayoutAdmin/LayoutAdmin';
import LayoutClient from 'components/LayoutClient/LayoutClient';
import LayoutCultivator from 'components/LayoutCultivator/LayoutCultivator';
import LayoutLanding from 'components/LayoutLanding/LayoutLanding';
import LayoutWallet from 'components/LayoutWallet/LayoutWallet';

import styles from './styles';

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const { isReady, isOnAuthPages, router } = useAuth();

  if (!isReady) {
    return null;
  }
  if (isOnAuthPages) {
    return <Box sx={styles.container}>{children}</Box>;
  }
  if (router.pathname.includes('/cultivator/')) {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <LayoutCultivator>{children}</LayoutCultivator>
        </Box>
      </Box>
    );
  }
  if (router.pathname.includes('/client')) {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <LayoutClient>{children}</LayoutClient>
        </Box>
      </Box>
    );
  }
  if (router.pathname === '/') {
    return (
      <>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_ENV_RECAPTCHA_KEY}`}
        />
        <Box sx={styles.container}>
          <Box sx={styles.content}>
            <LayoutLanding>{children}</LayoutLanding>
          </Box>
        </Box>
      </>
    );
  }
  if (router.pathname === '/ratings') {
    return (
      <>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_ENV_RECAPTCHA_KEY}`}
        />
        <Box sx={styles.container}>
          <Box sx={styles.content}>
            <LayoutLanding>{children}</LayoutLanding>
          </Box>
        </Box>
      </>
    );
  }

  if (router.pathname.includes('/wallet')) {
    return (
      <>
        <Box sx={styles.container}>
          <Box sx={styles.content}>
            <LayoutWallet>{children}</LayoutWallet>
          </Box>
        </Box>
      </>
    );
  }

  if (router.pathname.includes('/admin')) {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          <LayoutAdmin>{children}</LayoutAdmin>
        </Box>
      </Box>
    );
  }
  return <Box sx={styles.container}>{children}</Box>;
};

export default Layout;
