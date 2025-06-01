import { FC, memo, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Box, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { colors } from 'mui/theme/colors';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import { TModalStateAction } from 'sharedArchitech/hooks/useModalState/useModalState';
import useMe from 'sharedProject/hooks/useMe';

import MenuDrawer from './MenuDrawer/MenuDrawer';
import styles from './styles';

const MobileMenu: FC<{ openChat: TModalStateAction<number>; isChatMessage: boolean }> = ({
  openChat,
  isChatMessage
}) => {
  const { dataMe } = useMe();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.chatPosition}>
        <Badge invisible={!isChatMessage} color="secondary" variant="dot">
          <IconButton onClick={() => openChat()}>
            <ChatIcon />
          </IconButton>
        </Badge>
        <Box sx={styles.divider}>
          <Divider orientation="vertical" />
        </Box>
      </Box>

      <Box sx={styles.avatarPosition}>
        <Avatar src={dataMe?.asset?.url || undefined} />
      </Box>

      <Box sx={styles.menuPosition}>
        <IconButton sx={styles.menuIcon} onClick={handleDrawerToggle}>
          <MenuIcon htmlColor={colors.white} />
        </IconButton>
      </Box>
      <SwipeableDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={styles.drawerMobile}
        onOpen={handleDrawerToggle}
        anchor="right"
      >
        {mobileOpen && <MenuDrawer close={handleDrawerToggle} />}
      </SwipeableDrawer>
    </Box>
  );
};

export default memo(MobileMenu);
