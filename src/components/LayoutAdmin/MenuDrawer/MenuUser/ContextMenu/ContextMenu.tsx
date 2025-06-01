import { FC } from 'react';
import { Avatar, Box, CardActionArea, Typography } from '@mui/material';
import { IUserModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import LogoutIcon from 'resources/iconsMui/LogoutIcon';
import ProfileIcon from 'resources/iconsMui/ProfileIcon';
import { TVoidFun } from 'sharedArchitech/types';
import truncateText from 'sharedArchitech/utils/truncateText';
import useLogout from 'sharedProject/hooks/useLogout';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';

const ContextMenu: FC<{
  close: TVoidFun;
  user: IUserModel | undefined;
}> = ({ close, user }) => {
  const { logout } = useLogout();
  const { goToModal, query } = useProjectRouter();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.userContainer}>
        <Box sx={styles.nameWrapper}>
          <Avatar src={user?.asset?.url || undefined} sx={styles.facilityAvatar} />
          <Typography variant="body1" fontWeight={500} sx={styles.name}>
            {truncateText(user?.fullName, 25) || user?.email}
          </Typography>
        </Box>
        <CardActionArea onClick={() => handleRoute('user-profile')} sx={styles.listItem}>
          <ProfileIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            My Profile
          </Typography>
        </CardActionArea>
        <CardActionArea onClick={logout} sx={styles.listItem}>
          <LogoutIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            Logout
          </Typography>
        </CardActionArea>
      </Box>
    </Box>
  );

  function handleRoute(modalId: string) {
    close();
    goToModal(
      query?.id
        ? {
            modalId: modalId,
            id: query?.id
          }
        : {
            modalId: modalId
          }
    );
  }
};

export default ContextMenu;
