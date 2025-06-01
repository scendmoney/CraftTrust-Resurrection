import { FC, ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { colors } from 'mui/theme/colors';

import styles from './styles';
import IProps from './types';

const InputSearch: FC<IProps> = ({ value, onChange, onBlur, closeHandler }): ReactElement => {
  return (
    <TextField
      type="text"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value ? (
              <IconButton onClick={closeHandler} size="medium">
                <CloseIcon fontSize="medium" htmlColor={colors.white} />
              </IconButton>
            ) : (
              <IconButton size="medium">
                <SearchIcon fontSize="medium" htmlColor={colors.white} />
              </IconButton>
            )}
          </InputAdornment>
        ),
        disableUnderline: true
      }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      variant="standard"
      sx={styles.searchInput}
      placeholder={'Search products'}
      autoComplete="off"
    />
  );
};

export default InputSearch;
