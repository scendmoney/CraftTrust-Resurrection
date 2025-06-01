import { FC, memo, MouseEvent, ReactElement, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

import currentFilterStatusButtonMap from '../utils/currentFilterStatusButtonMap';

import styles from './styles';
const PopoverFilterWrapper: FC<{
  children: ReactElement;
  value: string[];
  title: string;
  onRemove: () => void;
  columnName: string;
}> = ({ children, value, title = 'Search', onRemove, columnName }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const text = (value || [])[0];
  const isValue = text !== '' && text !== null && text !== undefined;

  const stylesUm = useMemo(() => {
    return styles(Boolean(anchorEl), isValue);
  }, [anchorEl, isValue]);

  return (
    <>
      <Box sx={stylesUm.wrapper}>
        <Button
          sx={stylesUm.button}
          onClick={isValue ? onRemove : handleClickListItem}
          endIcon={isValue ? <CloseIcon /> : undefined}
        >
          {currentFilterStatusButtonMap(columnName, value) || title}
        </Button>
      </Box>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        disableRestoreFocus
        sx={stylesUm.popover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={stylesUm.menu}>{children}</Box>
      </Popover>
    </>
  );
};

export default memo(PopoverFilterWrapper);
