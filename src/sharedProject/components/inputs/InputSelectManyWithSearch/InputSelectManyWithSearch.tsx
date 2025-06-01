import { ChangeEvent, FC, memo, ReactElement, useMemo, useRef, useState } from 'react';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import { colors } from 'mui/theme/colors';

import AvatarUncontrolled from '../../AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';
import IProps from './types';

const InputSelectManyWithSearch: FC<IProps> = ({
  helperText,
  titleText,
  invalid = false,
  options,
  isDark = false,
  onOptionsSearch,
  onValueChange,
  loading,
  ...props
}): ReactElement => {
  const stylesUm = useMemo(() => {
    return styles(props?.readOnly || false, isDark);
  }, [props.readOnly, isDark]);
  const [searchInputText, setSearchInputText] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchInput, setSearchInput] = useState<string>('');

  const debouncedOnValueChange = useRef(
    _.debounce((newValue: string) => {
      onOptionsSearch(newValue);
      setSearchInput(newValue);
    }, 500)
  ).current;

  const onSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchInputText(event.target.value);
    debouncedOnValueChange(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setSearchInput('');
    setSearchInputText('');
    onOptionsSearch('');
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={stylesUm.block}>
        {props.required ? (
          <Box sx={stylesUm.required}>
            <InputLabel sx={stylesUm.label}>{titleText}</InputLabel>
            <Typography sx={{ color: colors.secondary }}> *</Typography>
          </Box>
        ) : (
          <InputLabel sx={stylesUm.label}>{titleText}</InputLabel>
        )}

        <Box sx={stylesUm.selectedGroup}>
          {(props.value || []).map((item) => {
            return (
              <Box sx={stylesUm.selected} key={item.value}>
                {item.logo &&
                  (item.logo.length > 1 ? (
                    <AvatarUncontrolled src={item.logo} type={24} />
                  ) : (
                    <AvatarUncontrolled src={undefined} type={24} />
                  ))}
                <Typography variant="subtitle1" fontWeight={400} flexGrow={1}>
                  {item.label}
                </Typography>
                {props.readOnly ? null : (
                  <IconButton
                    onClick={() =>
                      onValueChange(props.value?.filter((item2) => item2.value !== item.value))
                    }
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            );
          })}
        </Box>
        {props.readOnly ? (
          props.value ? null : (
            <InputBase
              readOnly
              sx={stylesUm.fakeInput}
              type="text"
              autoComplete="off"
              placeholder={props.placeholder || 'Select'}
            />
          )
        ) : (
          <InputBase
            onClick={handleClick}
            sx={stylesUm.fakeInput}
            type="text"
            autoComplete="off"
            placeholder={props.placeholder || 'Select'}
            value={searchInputText}
            onChange={onSearch}
            endAdornment={
              <InputAdornment position="end">
                <IconButton size="small">
                  {loading ? <CircularProgress size={24} /> : <ArrowDropDownIcon color="error" />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}

        <Menu
          disablePortal
          disableScrollLock
          disableEnforceFocus
          disableAutoFocus
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={stylesUm.menu}
        >
          <Box sx={{ position: 'relative' }}>
            <Box sx={stylesUm.menuItems}>
              {options.map((item) => {
                return (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                    sx={stylesUm.item}
                    onClick={() => {
                      onValueChange([...(props.value || []), item]);
                      handleClose();
                    }}
                  >
                    {item?.logo &&
                      (item.logo.length > 1 ? (
                        <AvatarUncontrolled type={24} src={item.logo} />
                      ) : (
                        <AvatarUncontrolled type={24} src={undefined} />
                      ))}
                    <Typography variant="body1">{item.label}</Typography>
                  </MenuItem>
                );
              })}
              {!options.length && (
                <Box pt={2}>
                  <Typography textAlign="center" variant="body1">
                    No results
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Menu>

        <FormHelperText error={invalid}>{helperText}</FormHelperText>
      </Box>
    </>
  );
};

export default memo(InputSelectManyWithSearch);
