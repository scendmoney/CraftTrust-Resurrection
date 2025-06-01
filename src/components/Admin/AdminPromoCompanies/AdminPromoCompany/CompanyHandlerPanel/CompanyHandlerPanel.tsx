import { FC, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { CompanyStatusEnum, ICompanyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ArchivedIcon from 'resources/iconsMui/ArchivedIcon';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import AdminPromoCompaniesUpdate from '../../AdminPromoCompaniesCreate/AdminPromoCompaniesUpdate';

import styles from './styles';

const CompanyHandlerPanel: FC<{
  status: CompanyStatusEnum;
  onSubmit(): Promise<void>;
  onArchive(): Promise<void>;
  data: ICompanyModel | undefined;
}> = ({ status, onSubmit, onArchive, data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isOpen, openModal, closeModal } = useModalState();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const getStatusInfoUm = useMemo(() => {
    switch (status) {
      case CompanyStatusEnum.Draft:
        return {
          label: 'Ready to Start',
          button: true,
          edit: true
        };
      case CompanyStatusEnum.Active:
        return {
          label: 'Campaign is active',
          button: false,
          edit: false
        };
      case CompanyStatusEnum.Pending:
        return {
          label: 'Waiting for Cultivator to Approve',
          button: false,
          edit: false
        };
      case CompanyStatusEnum.Completed:
        return {
          label: 'Campaign is completed',
          button: false,
          edit: false
        };
      case CompanyStatusEnum.Rejected:
        return {
          label: 'Ready to Start',
          button: true,
          edit: true
        };
      default:
        return {
          label: 'Ready to Start',
          button: true,
          edit: true
        };
    }
  }, [status]);

  return (
    <Fade in unmountOnExit mountOnEnter timeout={1000}>
      <Box sx={styles.container}>
        <Typography variant="subtitle1" color={colors.white} my={getStatusInfoUm.button ? 0 : 1}>
          {getStatusInfoUm.label}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="small"
          >
            <MoreVertIcon fontSize="small" htmlColor="white" />
          </IconButton>
          <Menu
            sx={styles.menu}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right'
            }}
          >
            <MenuItem
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleArchiveCampaign();
                event.stopPropagation();
              }}
            >
              <ListItemIcon>
                <ArchivedIcon htmlColor={colors.secondary} />
              </ListItemIcon>
              <ListItemText>Archive</ListItemText>
            </MenuItem>
          </Menu>
          {getStatusInfoUm.edit ? (
            <Box>
              <ButtonUi
                var={EButtonType.WhiteBordered}
                onClick={() => openModal()}
                style={{ minWidth: '8vw' }}
              >
                Edit Campaign
              </ButtonUi>
            </Box>
          ) : null}

          {getStatusInfoUm.button ? (
            <Box>
              <ButtonUi onClick={onSubmit}>Request Approval</ButtonUi>
            </Box>
          ) : null}
        </Box>

        <AdminPromoCompaniesUpdate isOpen={isOpen} closeModal={closeModal} dataCompany={data} />
      </Box>
    </Fade>
  );

  function handleArchiveCampaign() {
    onArchive();
    setAnchorEl(null);
  }
};

export default CompanyHandlerPanel;
