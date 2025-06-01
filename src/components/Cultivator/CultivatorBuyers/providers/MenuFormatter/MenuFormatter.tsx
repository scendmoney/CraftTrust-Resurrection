import { ComponentType, memo, useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IMutationRemoveRelationCultivatorToBuyerArgs } from 'graphql/_server';
import REMOVE_RELATION_CULTIVATOR_TO_BUYER from 'graphql/mutations/removeRelationCultivatorToBuyer';
import { colors } from 'mui/theme/colors';
import projectConstants from 'projectConstants';
import ProfileIcon from 'resources/iconsMui/ProfileIcon';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import useMe from 'sharedProject/hooks/useMe';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';
const MenuFormatter: ComponentType<{ rowId: number; rowName: string }> = ({ rowId, rowName }) => {
  const { dataMe } = useMe();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [removeRelationCultivatorToBuyer] = useMutation<
    { removeRelationCultivatorToBuyer: boolean },
    IMutationRemoveRelationCultivatorToBuyerArgs
  >(REMOVE_RELATION_CULTIVATOR_TO_BUYER);

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

  const isDisableDisconnect = dataMe?.id !== dataMe?.context?.owner?.id;

  const client = useApolloClient();

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
        <MenuItem onClick={handleOpenDelete} disabled={isDisableDisconnect}>
          <ListItemIcon>
            <PlaylistRemoveIcon htmlColor={colors.secondary} />
          </ListItemIcon>
          <ListItemText>Disconnect</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => goToModal({ id: rowId })}>
          <ListItemIcon>
            <ProfileIcon fill={colors.secondary} />
          </ListItemIcon>
          <ListItemText>View Profile</ListItemText>
        </MenuItem>
      </Menu>

      <DialogUI
        title="Delete Buyer"
        close={closeDelete}
        open={isOpenDelete}
        buttonSubmit={handleDeleteInvite}
        buttonSubmitText="Disconnect"
        isLoading={isLoading}
      >
        <>Do you really want to delete the connection with {rowName}?</>
      </DialogUI>
    </>
  );

  async function handleOpenDelete(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setAnchorEl(null);
    openDelete();
  }

  async function handleDeleteInvite() {
    try {
      startLoading();
      const response = await removeRelationCultivatorToBuyer({
        variables: {
          payload: {
            facilityId: String(rowId)
          }
        }
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Buyer removed');

      await client.refetchQueries({
        include: ['buyers']
      });
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      stopLoading();
    }
  }
};

export default memo(MenuFormatter);
