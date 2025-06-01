import { FC, ReactElement, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import AdminProfileWrapper from 'components/Admin/AdminProfile/AdminProfileWrapper';

import MenuDrawer from './MenuDrawer/MenuDrawer';
import styles from './styles';

const LayoutAdmin: FC<{ children: ReactElement }> = ({ children }) => {
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
        <SwipeableDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={styles.drawerMobile}
          onOpen={handleDrawerToggle}
        >
          <MenuDrawer />
        </SwipeableDrawer>

        <Drawer variant="permanent" sx={styles.drawerDesktop} open>
          <MenuDrawer />
        </Drawer>
      </Box>

      <SidebarBottom isOpen={modalId === 'user-profile'} close={clearQuery}>
        <AdminProfileWrapper />
      </SidebarBottom>

      <Box component="main" sx={styles.children}>
        {children}
      </Box>
    </Box>
  );
};

export default LayoutAdmin;
