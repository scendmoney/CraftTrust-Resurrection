import { FC, memo, MouseEvent, ReactElement, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { colors } from 'mui/theme/colors';
import currentFilterStatusButtonMap from 'sharedProject/components/filters/utils/currentFilterStatusButtonMap';

import styles from './styles';
const PopoverEditorWrapper: FC<{
  children: ReactElement;
  value: string[];
  title: string;
  onRemove: () => void;
  columnName: string;
}> = ({ children, value, title = 'Price', onRemove, columnName }) => {
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
      <Box pl={1} pr={1.5} flexGrow={1}>
        <TextField
          fullWidth
          autoComplete="off"
          placeholder={title}
          size="small"
          variant="standard"
          aria-readonly
          value={currentFilterStatusButtonMap(columnName, value)}
          onClick={handleClickListItem}
          InputProps={{
            readOnly: true,
            endAdornment: isValue ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleOnRemove}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                <MoreHorizIcon fontSize="small" htmlColor={colors.gray3} />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
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

  function handleOnRemove(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    onRemove();
  }
};

export default memo(PopoverEditorWrapper);
