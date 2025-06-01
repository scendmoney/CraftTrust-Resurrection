import { ComponentType, memo, useState } from 'react';
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import { Box, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ProductStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import useProductsMutations from '../../useProductsMutations';

import styles from './styles';
const MenuFormatter: ComponentType<{ rowId: number; rowStatus: ProductStatusEnum }> = ({
  rowId,
  rowStatus
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { goToModal } = useProjectRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const { listItem, unlistItem, archiveItem, newItem } = useProductsMutations(rowId);

  return (
    <Box minWidth={30}>
      <IconButton
        id="demo-positioned-button"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        sx={styles.menu}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {rowStatus !== ProductStatusEnum.Listed && (
          <MenuItem
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              listItem();
              event.stopPropagation();
            }}
          >
            <ListItemIcon>
              <PlaylistAddOutlinedIcon htmlColor={colors.secondary} />
            </ListItemIcon>
            <ListItemText>Change to Listed</ListItemText>
          </MenuItem>
        )}

        {rowStatus !== ProductStatusEnum.Unlisted && (
          <MenuItem
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              unlistItem();
              event.stopPropagation();
            }}
          >
            <ListItemIcon>
              <PlaylistRemoveOutlinedIcon htmlColor={colors.secondary} />
            </ListItemIcon>
            <ListItemText>Change to Unlisted</ListItemText>
          </MenuItem>
        )}

        {rowStatus !== ProductStatusEnum.New && (
          <MenuItem
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              newItem();
              event.stopPropagation();
            }}
          >
            <ListItemIcon>
              <FiberNewIcon htmlColor={colors.secondary} />
            </ListItemIcon>
            <ListItemText>Change to New</ListItemText>
          </MenuItem>
        )}

        {rowStatus !== ProductStatusEnum.Archived && (
          <MenuItem
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              archiveItem();
              event.stopPropagation();
            }}
          >
            <ListItemIcon>
              <AllInboxOutlinedIcon htmlColor={colors.secondary} />
            </ListItemIcon>
            <ListItemText>Change to Archived</ListItemText>
          </MenuItem>
        )}

        <MenuItem
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleGoToId();
            event.stopPropagation();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon htmlColor={colors.secondary} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );

  function handleGoToId() {
    const rowIdNumbered = Number(rowId);
    if (isFinite(rowIdNumbered)) {
      goToModal({
        id: rowIdNumbered
      });
    }
    setAnchorEl(null);
  }
};

export default memo(MenuFormatter);
