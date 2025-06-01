import { ComponentType, memo, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { InviteStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import projectConstants from 'projectConstants';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import useInvitesMutations from 'sharedProject/hooks/useInvitesMutations';

import styles from './styles';
const InvitationsMenuFormatter: ComponentType<{ rowId: number; rowStatus: InviteStatusEnum }> = ({
  rowId,
  rowStatus
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const client = useApolloClient();

  const { isLoading, resendInvite, rejectInvite } = useInvitesMutations();

  const { isOpen: isOpenResend, openModal: openResend, closeModal: closeResend } = useModalState();
  const { isOpen: isOpenDelete, openModal: openDelete, closeModal: closeDelete } = useModalState();

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        disabled={rowStatus !== InviteStatusEnum.Processing}
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
        <MenuItem onClick={handleOpenDelete}>
          <ListItemIcon>
            <CloseIcon htmlColor={colors.secondary} />
          </ListItemIcon>
          <ListItemText>Revoke</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleOpenResend}>
          <ListItemIcon>
            <RepeatOutlinedIcon htmlColor={colors.secondary} />
          </ListItemIcon>
          <ListItemText>Resend</ListItemText>
        </MenuItem>
      </Menu>

      <DialogUI
        title="Resend Invite"
        close={closeResend}
        open={isOpenResend}
        buttonSubmit={handleResendInvite}
        buttonSubmitText="Resend"
        buttonCancelText="Back"
        isLoading={isLoading}
      >
        <>Do you really want to send that invitation again?</>
      </DialogUI>

      <DialogUI
        title="Revoke Invite"
        close={closeDelete}
        open={isOpenDelete}
        buttonSubmit={handleDeleteInvite}
        buttonSubmitText="Revoke"
        buttonCancelText="Back"
        isLoading={isLoading}
      >
        <>Do you really want to revoke this invitation?</>
      </DialogUI>
    </>
  );

  async function handleOpenResend() {
    setAnchorEl(null);
    openResend();
  }

  async function handleOpenDelete() {
    setAnchorEl(null);
    openDelete();
  }

  async function handleResendInvite() {
    if (!rowId) {
      throw new Error(projectConstants.messages.error);
    }
    await resendInvite({
      payload: {
        id: rowId
      }
    });

    closeResend();

    await client.refetchQueries({
      include: ['invitations']
    });
  }

  async function handleDeleteInvite() {
    if (!rowId) {
      throw new Error(projectConstants.messages.error);
    }
    await rejectInvite({
      payload: {
        id: rowId
      }
    });

    closeDelete();

    await client.refetchQueries({
      include: ['invitations']
    });
  }
};

export default memo(InvitationsMenuFormatter);
