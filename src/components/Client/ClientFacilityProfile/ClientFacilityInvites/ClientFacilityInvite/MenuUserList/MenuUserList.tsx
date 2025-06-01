import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { Typography } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { colors } from 'mui/theme/colors';

const MenuUserList: FC<{
  openDelete(): Promise<void>;
  openResend(): Promise<void>;
}> = ({ openDelete, openResend }) => {
  return (
    <>
      <MenuList sx={{ width: 200, maxWidth: '100%' }}>
        <MenuItem onClick={openDelete}>
          <ListItemIcon>
            <CloseIcon fontSize="small" htmlColor={colors.secondary} />
          </ListItemIcon>
          <Typography variant="body1" fontWeight={500}>
            Revoke
          </Typography>
        </MenuItem>
        <MenuItem onClick={openResend}>
          <ListItemIcon>
            <RepeatOutlinedIcon fontSize="small" htmlColor={colors.secondary} />
          </ListItemIcon>
          <Typography variant="body1" fontWeight={500}>
            Resend
          </Typography>
        </MenuItem>
      </MenuList>
    </>
  );
};

export default MenuUserList;
