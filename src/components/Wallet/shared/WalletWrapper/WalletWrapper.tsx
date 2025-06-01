import { type FC, type ReactElement, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import useLogout from 'sharedProject/hooks/useLogout';
import useMeClient from 'sharedProject/hooks/useMeClient';

import { EButtonType } from '../../../../sharedProject/components/ButtonUi/types';

import styles from './styles';

const WalletWrapper: FC<{ children: ReactElement; isBurger?: boolean }> = ({
  children,
  isBurger = true
}) => {
  const router = useRouter();
  const { dataMe, isLoggedIn } = useMeClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { logout } = useLogout();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box>
          <CardActionArea sx={styles.logo} onClick={() => router.push('/wallet/')}>
            <Box component="img" src="/resources/wallet/logo.svg" />
          </CardActionArea>
        </Box>

        {isLoggedIn && isBurger ? (
          <>
            <Box>
              <CardActionArea component="div" sx={styles.buttons} onClick={handleClick}>
                <Box display="flex" alignItems="center" gap={1}>
                  <MenuIcon />

                  <AvatarUncontrolled type={32} src={dataMe?.asset?.url || undefined} />
                </Box>
              </CardActionArea>
            </Box>

            <Menu
              sx={{ mt: 1 }}
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <ButtonUi
                onClick={() => handleGoTo('/wallet')}
                fullWidth
                var={EButtonType.TextWithIcon}
                startIcon={<OtherHousesOutlinedIcon />}
              >
                Home
              </ButtonUi>
              <ButtonUi
                onClick={() => handleGoTo('/wallet/profile')}
                fullWidth
                var={EButtonType.TextWithIcon}
                startIcon={<Person2OutlinedIcon />}
              >
                My Profile
              </ButtonUi>
              <ButtonUi
                onClick={() => handleGoTo('/wallet/settings')}
                fullWidth
                var={EButtonType.TextWithIcon}
                startIcon={<SettingsOutlinedIcon />}
              >
                Settings
              </ButtonUi>
              <Box my={1}>
                <Divider />
              </Box>

              <ButtonUi
                onClick={() => logout()}
                fullWidth
                var={EButtonType.TextWithIcon}
                startIcon={<LogoutOutlinedIcon />}
              >
                Logout
              </ButtonUi>
            </Menu>
          </>
        ) : null}
      </Box>

      {children}
    </Box>
  );

  function handleGoTo(to: string) {
    router.push(to);
    setAnchorEl(null);
  }
};

export default WalletWrapper;
