import { FC, memo, MouseEvent, useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';

import styles from './styles';
import { IOption, IProps } from './types';

const MenuButton: FC<IProps> = ({ options, disabled, initialOption }): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (initialOption) {
      setSelectedOption(initialOption);
    }
  }, [initialOption]);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option: IOption, event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
    setSelectedOption(option.label);
    option.onClick();
  };

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <Box sx={styles.wrapper}>
        <Button
          sx={styles.button}
          onClick={handleClickListItem}
          endIcon={anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        >
          {selectedOption || 'Sort'}
        </Button>
      </Box>

      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        sx={styles.popover}
        // disablePortal={disablePortal}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <MenuList sx={styles.menu} onClick={(event) => handleMenuClick(event)}>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              sx={styles.menuItem}
              onClick={(event) => handleMenuItemClick(option, event)}
              disabled={option.disabled}
            >
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

export default memo(MenuButton);
