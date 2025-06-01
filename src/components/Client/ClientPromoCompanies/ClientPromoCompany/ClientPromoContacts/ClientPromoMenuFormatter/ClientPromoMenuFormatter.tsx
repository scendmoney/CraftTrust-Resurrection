import { ComponentType, memo, useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { Box, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  CompanyStatusEnum,
  FacilityRoleEnum,
  IMutationConfirmSurveyBuyerArgs,
  IMutationRejectSurveyBuyerArgs,
  ISubcompanyModel,
  ISurveyModel,
  IUserModel,
  SurveyStatusEnum
} from 'graphql/_server';
import CONFIRM_SURVEY_BUYER from 'graphql/mutations/confirmSurveyBuyer';
import { colors } from 'mui/theme/colors';
import projectConstants from 'projectConstants';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';

export type TInputs = {
  productId: string;
  sold: number;
};

import REJECT_SURVEY_BUYER from 'graphql/mutations/rejectSurveyBuyer';
import { useLoading } from 'sharedArchitech/hooks/useLoading';

import styles from './styles';
const ClientPromoMenuFormatter:
  | ComponentType<{
      value: DataTypeProvider.ValueFormatterProps;
      dataMe?: IUserModel;
      subcompanyById?: ISubcompanyModel;
      id: string | undefined;
    }>
  | undefined = ({ value, dataMe, subcompanyById }) => {
  const [confirmSurveyBuyer] = useMutation<
    { confirmSurveyBuyer: ISurveyModel },
    IMutationConfirmSurveyBuyerArgs
  >(CONFIRM_SURVEY_BUYER);

  const [rejectSurveyBuyer] = useMutation<
    { rejectSurveyBuyer: ISurveyModel },
    IMutationRejectSurveyBuyerArgs
  >(REJECT_SURVEY_BUYER);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const client = useApolloClient();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const { isLoading, startLoading, stopLoading } = useLoading();

  const { isOpen: isOpenReject, openModal: openReject, closeModal: closeReject } = useModalState();
  const {
    isOpen: isOpenConfirm,
    openModal: openConfirm,
    closeModal: closeConfirm
  } = useModalState();

  if (
    value?.row?.status === SurveyStatusEnum.New &&
    (dataMe?.context?.role === FacilityRoleEnum.Buyer ||
      dataMe?.context?.role === FacilityRoleEnum.BuyerAndCultivator)
  ) {
    return (
      <>
        <Box sx={styles.container}>
          <ButtonUi
            minWidth="initial"
            onClick={() => openConfirm()}
            disabled={
              subcompanyById?.quantity === subcompanyById?.quantitySold ||
              subcompanyById?.company.status !== CompanyStatusEnum.Active
            }
          >
            Confirm
          </ButtonUi>

          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="small"
            sx={{ ml: 0.5 }}
            disabled={subcompanyById?.company.status !== CompanyStatusEnum.Active}
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
              onClick={() => {
                openReject();
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <PlaylistRemoveIcon htmlColor={colors.secondary} />
              </ListItemIcon>
              <ListItemText>Cancel</ListItemText>
            </MenuItem>
          </Menu>

          <DialogUI
            title="Reject Contact"
            open={isOpenReject}
            buttonSubmit={() => rejectSurveyBuyerHandler()}
            buttonCancelText="No"
            buttonSubmitText="Yes, Reject Contact"
            close={closeReject}
            isLoading={isLoading}
          >
            <>Do you really want to Reject?</>
          </DialogUI>

          <DialogUI
            title="Confirm Contact"
            open={isOpenConfirm}
            buttonSubmit={() => confirmSurveyBuyerHandler()}
            buttonSubmitText="Confirm"
            close={closeConfirm}
            isLoading={isLoading}
          >
            <Box pt={0}>Do your really want to confirm this contact?</Box>
          </DialogUI>
        </Box>
      </>
    );
  }

  if (
    value?.row?.status === SurveyStatusEnum.New ||
    value?.row?.status === SurveyStatusEnum.Rejected
  ) {
    return (
      <Box sx={styles.container}>
        <ButtonUi minWidth="initial" disabled>
          Not Verified
        </ButtonUi>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <ButtonUi minWidth="initial" disabled>
        Verified
      </ButtonUi>
    </Box>
  );

  async function rejectSurveyBuyerHandler() {
    try {
      startLoading();

      if (!value.row.id) {
        throw new Error('Wrong Subcampaign ID');
      }
      const response = await rejectSurveyBuyer({
        variables: {
          payload: {
            id: Number(value.row.id)
          }
        }
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Survey Rejected');
      await client.refetchQueries({
        include: ['subcompaniesBuyer', 'surveysBuyer']
      });
      // setAnchorEl(null);
      closeReject();
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      stopLoading();
    }
  }

  async function confirmSurveyBuyerHandler() {
    try {
      startLoading();

      if (!value.row.id) {
        throw new Error('Wrong Subcampaign ID');
      }
      const response = await confirmSurveyBuyer({
        variables: {
          payload: {
            id: Number(value.row.id)
            // productSold: Number(values.sold)
          }
        }
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Survey Confirmed');
      await client.refetchQueries({
        include: ['subcompaniesBuyer', 'surveysBuyer']
      });
      // setAnchorEl(null);
      closeConfirm();
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      stopLoading();
    }
  }
};

export default memo(ClientPromoMenuFormatter);
