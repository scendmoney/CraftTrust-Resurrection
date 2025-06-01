import { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TModalStateAction } from 'sharedArchitech/hooks/useModalState/useModalState';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import MenuLogo from 'components/LayoutClient/MenuLogo/MenuLogo';
import Search from 'components/LayoutClient/Search/Search';

import MobileMenu from './MobileMenu/MobileMenu';
import styles from './styles';

const LayoutClientHeaderMobile: FC<{
  openChat: TModalStateAction<number>;
  isChatMessage: boolean;
}> = ({ openChat, isChatMessage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { pathname } = useProjectRouter();
  const isProductsPage = pathname === '/client';
  return isMobile ? (
    <Box sx={styles.mobileWrapper}>
      <Box sx={styles.mobileWrapperHeader}>
        <MenuLogo />
        <MobileMenu openChat={openChat} isChatMessage={isChatMessage} />
      </Box>

      {isProductsPage && <Search />}
    </Box>
  ) : (
    <Box sx={styles.tabletWrapper}>
      <Box sx={styles.tabletWrapperHeader}>
        <MenuLogo />
        <Search />
      </Box>

      <MobileMenu openChat={openChat} isChatMessage={isChatMessage} />
    </Box>
  );
};

export default LayoutClientHeaderMobile;
