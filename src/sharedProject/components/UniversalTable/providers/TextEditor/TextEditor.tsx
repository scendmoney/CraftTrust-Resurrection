import { ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { colors } from 'mui/theme/colors';
import { useDebounce } from 'sharedArchitech/hooks/useDebounce';

import styles from './styles';

interface IProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const TextEditor: React.FC<IProps> = ({ value, onValueChange }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    onValueChange(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
  return (
    <Box sx={styles.wrapper} flexGrow={1}>
      <TextField
        autoComplete="off"
        fullWidth
        value={inputValue}
        onChange={handleChange}
        placeholder="Search"
        size="small"
        variant="standard"
        sx={styles.input}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon fontSize="small" htmlColor={colors.gray3} />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputValue(event.target.value);
  }
};
