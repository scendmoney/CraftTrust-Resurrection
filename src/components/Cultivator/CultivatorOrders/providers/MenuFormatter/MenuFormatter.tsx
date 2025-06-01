import { ComponentType, memo, useState } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { colors } from 'mui/theme/colors';
import CartIcon from 'resources/iconsMui/CartIcon';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';
const MenuFormatter: ComponentType<DataTypeProvider.ValueFormatterProps> | undefined = ({
  row
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
        <MenuItem onClick={handleGoToId}>
          <ListItemIcon>
            <CartIcon fill={colors.secondary} />
          </ListItemIcon>
          <ListItemText>Open</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );

  function handleGoToId() {
    const rowIdNumbered = Number(row.id);
    if (isFinite(rowIdNumbered)) {
      goToModal({
        id: rowIdNumbered
      });
    }
    setAnchorEl(null);
  }
};

export default memo(MenuFormatter);
