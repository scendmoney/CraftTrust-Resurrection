/* eslint-disable no-console */
import { FC, ReactElement, useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import UniversalProfileMeWrapper from 'sharedProject/components/profile/UniversalProfileMeWrapper/UniversalProfileMeWrapper';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import QRScanner from 'components/Wallet/QRScanner/QRScanner';

import LayoutClientHeader from './LayoutClientHeader/LayoutClientHeader';
import styles from './styles';

const LayoutClient: FC<{ children: ReactElement }> = ({ children }) => {
  const { query, clearDynamicQuery, router } = useProjectRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isProductPage = router.pathname.includes('/products/[id]');
  const isCartMobilePage = router.pathname === '/client/cart' && isMobile;

  const stylesUm = useMemo(() => {
    return styles(isProductPage, isCartMobilePage);
  }, [isProductPage, isCartMobilePage]);

  return (
    <Box sx={stylesUm.container}>
      <LayoutClientHeader />

      <Box component="main" sx={stylesUm.children}>
        {children}
      </Box>

      <SidebarBottom
        isOpen={nextRouterQueryCheckText(query.modalId) === 'user-profile'}
        close={handleClearQuery}
      >
        <UniversalProfileMeWrapper />
      </SidebarBottom>

      {nextRouterQueryCheckText(query.modalId) === 'qr-code' ? (
        <DialogUI close={handleClearQuery} open={true} hideButtons hidePaddings>
          <QRScanner close={handleClearQuery} />
        </DialogUI>
      ) : null}
    </Box>
  );

  function handleClearQuery() {
    clearDynamicQuery(
      query?.id
        ? {
            id: query?.id
          }
        : {}
    );
  }
};

export default LayoutClient;
