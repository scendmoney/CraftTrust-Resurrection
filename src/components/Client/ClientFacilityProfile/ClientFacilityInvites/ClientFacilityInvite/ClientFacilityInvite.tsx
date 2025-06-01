import { FC, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Menu, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { IInviteModel, InviteStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import projectConstants from 'projectConstants';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import useInvitesMutations from 'sharedProject/hooks/useInvitesMutations';
import mappingInvitationStatus from 'sharedProject/utils/mappingInvitationStatus';

import MenuUserList from './MenuUserList/MenuUserList';
import styles from './styles';

const ClientFacilityInvite: FC<{ user: IInviteModel }> = ({ user }) => {
  const client = useApolloClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { isLoading, resendInvite, rejectInvite } = useInvitesMutations();
  const { isOpen: isOpenResend, openModal: openResend, closeModal: closeResend } = useModalState();
  const { isOpen: isOpenDelete, openModal: openDelete, closeModal: closeDelete } = useModalState();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box key={user.id} sx={styles.empoyeeWrapper}>
      <Box sx={styles.empoyeeTitleWrapper}>
        <Box sx={styles.avatar}>
          <AccessTimeIcon htmlColor={colors.green} />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={500} sx={{ overflowWrap: 'anywhere' }}>
            {user.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Typography variant="subtitle1" fontWeight={500}>
          {mappingInvitationStatus(user.status)}
        </Typography>
        <Menu
          id="basic-button"
          anchorEl={anchorEl}
          onClose={handleClose}
          open={open}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuUserList openDelete={handleOpenDelete} openResend={handleOpenResend} />
        </Menu>
        <IconButton
          disabled={user?.status !== InviteStatusEnum.Processing}
          size="small"
          onClick={handleOpen}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

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
    </Box>
  );

  async function handleOpenResend() {
    setAnchorEl(null);
    openResend();
    handleClose();
  }

  async function handleOpenDelete() {
    setAnchorEl(null);
    openDelete();
    handleClose();
  }
  async function handleDeleteInvite() {
    try {
      if (!user.id) {
        throw new Error(projectConstants.messages.error);
      }
      const response = await rejectInvite({
        payload: {
          id: user.id
        }
      });

      closeDelete();

      if (response) {
        await client.refetchQueries({
          include: ['invitations']
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  async function handleResendInvite() {
    try {
      if (!user.id) {
        throw new Error(projectConstants.messages.error);
      }
      const response = await resendInvite({
        payload: {
          id: user.id
        }
      });

      closeResend();

      if (response) {
        await client.refetchQueries({
          include: ['invitations']
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};

export default ClientFacilityInvite;
