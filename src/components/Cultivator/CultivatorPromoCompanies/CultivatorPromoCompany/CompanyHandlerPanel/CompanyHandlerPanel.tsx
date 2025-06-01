import { FC, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import {
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Box from '@mui/material/Box';
import { CompanyStatusEnum, ICompanyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import CultivatorPromoCompanyUpdate from './CultivatorPromoCompanyUpdate/CultivatorPromoCompanyUpdate';
import styles from './styles';

const CompanyHandlerPanel: FC<{
  onSubmit(): Promise<void>;
  onReject(): Promise<void>;
  company: ICompanyModel | undefined;
}> = ({ onSubmit, onReject, company }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isOpen, openModal, closeModal } = useModalState();
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

  const currentDate = new Date();
  const isDateNotPassed = new Date(String(company?.dateEnd)) > currentDate;

  const isShowApproveButton =
    company?.subcompanies?.length &&
    (isDateNotPassed || !company.dateEnd) &&
    company.status === CompanyStatusEnum.Pending;

  const titleUm = useMemo(() => {
    if (company?.subcompanies?.length && (isDateNotPassed || !company.dateEnd)) {
      if (company.status === CompanyStatusEnum.Pending) {
        return 'Admin awaiting your confirmation.';
      } else {
        return 'Campaign is active';
      }
    } else if (company?.subcompanies?.length && !isDateNotPassed) {
      return 'Admin awaiting your confirmation. Please, update campaign dates.';
    } else {
      return 'Admin awaiting your confirmation. To confirm, add at least one dispensary.';
    }
  }, [company?.dateEnd, company?.status, company?.subcompanies?.length, isDateNotPassed]);

  return (
    <Fade in unmountOnExit mountOnEnter timeout={1000}>
      <Box sx={styles.container}>
        <Typography
          variant="subtitle1"
          color={colors.white}
          my={company?.subcompanies?.length ? 0 : 1}
        >
          {titleUm}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {company?.status === CompanyStatusEnum.Pending ? (
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
          ) : null}

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
                handleDeleteCart();
                event.stopPropagation();
              }}
            >
              <ListItemIcon>
                <ReportGmailerrorredIcon htmlColor={colors.secondary} />
              </ListItemIcon>
              <ListItemText>Cancel</ListItemText>
            </MenuItem>
          </Menu>
          <Box sx={styles.buttons}>
            <ButtonUi
              var={EButtonType.WhiteBordered}
              onClick={() => openModal()}
              style={{ minWidth: '8vw' }}
            >
              {isMobile ? 'Edit' : 'Edit Campaign'}
            </ButtonUi>
            {isShowApproveButton ? <ButtonUi onClick={onSubmit}>Approve</ButtonUi> : null}
          </Box>
        </Box>
        <CultivatorPromoCompanyUpdate
          isOpen={isOpen}
          closeModal={closeModal}
          dataCompany={company}
        />
      </Box>
    </Fade>
  );
  function handleDeleteCart() {
    onReject();
    setAnchorEl(null);
  }
};

export default CompanyHandlerPanel;
