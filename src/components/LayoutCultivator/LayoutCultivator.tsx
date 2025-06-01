import { FC, ReactElement, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CultivatorFacilityProfileWrapper from 'sharedProject/components/profile/CultivatorFacilityProfile/CultivatorFacilityProfileWrapper';
import UniversalProfileMeWrapper from 'sharedProject/components/profile/UniversalProfileMeWrapper/UniversalProfileMeWrapper';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import CultivatorStorefront from 'components/Cultivator/CultivatorStorefront/CultivatorStorefront';

import MenuDrawer from './MenuDrawer/MenuDrawer';
import styles from './styles';

const LayoutCultivator: FC<{ children: ReactElement }> = ({ children }) => {
  const { modalId, clearQuery } = useProjectRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={styles.container}>
      {!mobileOpen && (
        <Button sx={styles.mobileMenu} onClick={handleDrawerToggle} size="small">
          <MenuIcon fontSize="small" />
        </Button>
      )}

      <Box component="nav" sx={styles.drawerWrapper}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={styles.drawerMobile}
        >
          <MenuDrawer />
        </Drawer>

        <Drawer variant="permanent" sx={styles.drawerDesktop} open>
          <MenuDrawer />
        </Drawer>
      </Box>

      <SidebarBottom isOpen={modalId === 'user-profile'} close={clearQuery}>
        <UniversalProfileMeWrapper />
      </SidebarBottom>

      <SidebarBottom isOpen={modalId === 'facility-profile'} close={clearQuery}>
        <CultivatorFacilityProfileWrapper />
      </SidebarBottom>

      <SidebarBottom isOpen={modalId === 'cultivаtor-storefront'} close={clearQuery} isFullwidth>
        <CultivatorStorefront />
      </SidebarBottom>

      <Box component="main" sx={styles.children}>
        {children}
      </Box>
    </Box>
  );
};

export default LayoutCultivator;
