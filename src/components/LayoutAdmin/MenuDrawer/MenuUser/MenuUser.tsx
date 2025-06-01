import { FC, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fade, Menu, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { colors } from 'mui/theme/colors';
import truncateText from 'sharedArchitech/utils/truncateText';
import useMeAdmin from 'sharedProject/hooks/useMeAdmin';

import ContextMenu from './ContextMenu/ContextMenu';
import styles from './styles';
const MenuUser: FC = () => {
  const { dataMe, loadingMe } = useMeAdmin();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const nameUm = useMemo(() => {
    return truncateText(dataMe?.fullName || dataMe?.id, 18);
  }, [dataMe?.fullName, dataMe?.id]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleOpenOnBlockClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!open && !loadingMe) {
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
          <Avatar src={dataMe?.asset?.url || undefined} />

          <Typography sx={styles.title} variant="body1" fontWeight={500} color={colors.white}>
            {nameUm}
          </Typography>

          <IconButton
            size="small"
            onClick={handleOpen}
            id="basic-button"
            disabled={loadingMe}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
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
        <ContextMenu close={handleClose} user={dataMe} />
      </Popover>
    </>
  );
};

export default MenuUser;
