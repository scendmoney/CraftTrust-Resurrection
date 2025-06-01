import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fade, Menu, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { IUserModel } from 'graphql/_server';
import { ME_FACILITY_EDIT } from 'graphql/queries/me';
import { colors } from 'mui/theme/colors';
import truncateText from 'sharedArchitech/utils/truncateText';
import ContextMenu from 'sharedProject/components/ContextMenu/ContextMenu';
import useMe from 'sharedProject/hooks/useMe';

import styles from './styles';
const MenuUser: FC = () => {
  const { dataMe, loadingMe } = useMe();

  const { data, loading } = useQuery<{ me: IUserModel }>(ME_FACILITY_EDIT);

  const facilityUm = useMemo(() => {
    return dataMe?.context;
  }, [dataMe]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const nameUm = useMemo(() => {
    return truncateText(dataMe?.fullName || dataMe?.id, 18);
  }, [dataMe?.fullName, dataMe?.id]);

  const companyNameUm = useMemo(() => {
    return truncateText(facilityUm?.displayName || facilityUm?.name, 26);
  }, [facilityUm?.displayName, facilityUm?.name]);

  const handleOpenOnBlockClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!open && (!loading || !loadingMe)) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fade in={!loadingMe} timeout={1000}>
        <Box sx={styles.container} m={2} onClick={handleOpenOnBlockClick}>
          <Box sx={styles.avatarsWrapper}>
            <Avatar src={facilityUm?.asset?.url || undefined} sx={styles.avatarFacility} />
            <Avatar src={dataMe?.asset?.url || undefined} sx={styles.avatarUser} />
          </Box>

          <Box flexGrow={1}>
            <Typography sx={styles.title} variant="body1" fontWeight={500} color={colors.white}>
              {nameUm}
            </Typography>
            <Typography sx={styles.caption} variant="caption" color={colors.gray5}>
              {companyNameUm}
            </Typography>
          </Box>

          <IconButton size="small" id="basic-button" disabled={loading || loadingMe}>
            <MoreVertIcon fontSize="small" htmlColor={colors.gray5} />
          </IconButton>
        </Box>
      </Fade>

      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <ContextMenu
          close={handleClose}
          user={dataMe}
          facility={data?.me?.userToFacilities}
          loading={loading}
        />
      </Popover>
    </>
  );
};

export default MenuUser;
