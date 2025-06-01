import { ComponentType, memo, useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CompanyStatusEnum, IGetIdDto, IMutationDeleteSubcompanyAdminArgs } from 'graphql/_server';
import DELETE_SUBCOMPANY_ADMIN from 'graphql/mutations/deleteSubcompanyAdmin';
import { colors } from 'mui/theme/colors';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';

import AdminPromoSubcompaniesUpdate from '../AdminPromoSubcompaniesUpdate/AdminPromoSubcompaniesUpdate';

import styles from './styles';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuFormatter: ComponentType<{ row: any }> = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const client = useApolloClient();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { isOpen, openModal, closeModal } = useModalState();
  const {
    isOpen: isOpenDelete,
    openModal: openModalDelete,
    closeModal: closeModalDelete
  } = useModalState();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const [deleteSubcompanyAdmin] = useMutation<
    { deleteSubcompanyAdmin: IGetIdDto },
    IMutationDeleteSubcompanyAdminArgs
  >(DELETE_SUBCOMPANY_ADMIN);

  const isDisabledMenu =
    row.company.status === CompanyStatusEnum.Active ||
    row.company.status === CompanyStatusEnum.Archived ||
    row.company.status === CompanyStatusEnum.Pending ||
    row.company.status === CompanyStatusEnum.Completed;

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={isDisabledMenu}
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
        <MenuItem
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleUpdateSubcompanies();
            event.stopPropagation();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon htmlColor={colors.secondary} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleDeleteCart();
            event.stopPropagation();
          }}
        >
          <ListItemIcon>
            <PlaylistRemoveOutlinedIcon htmlColor={colors.secondary} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <AdminPromoSubcompaniesUpdate isOpen={isOpen} closeModal={closeModal} data={row} />
      <DialogUI
        title="Delete Dispensary"
        close={closeModalDelete}
        open={isOpenDelete}
        buttonSubmit={handleDeleteCartMutation}
        buttonSubmitText="Delete"
        isLoading={isLoading}
      >
        <>Do you really want to delete this dispensary?</>
      </DialogUI>
    </>
  );

  function handleDeleteCart() {
    openModalDelete();
    setAnchorEl(null);
  }

  function handleUpdateSubcompanies() {
    openModal();
    setAnchorEl(null);
  }

  async function handleDeleteCartMutation() {
    try {
      startLoading();
      await deleteSubcompanyAdmin({
        variables: {
          payload: {
            id: row.id
          }
        }
      });
      toast.success('Dispensary deleted');
      await client.refetchQueries({
        include: ['subcompaniesAdmin', 'companyByIdAdmin']
      });

      closeModalDelete();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default memo(MenuFormatter);
