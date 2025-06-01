import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import _ from 'lodash';

import styles from './styles';

interface IProps {
  onValueChange: (value: string) => void;
  helperText?: string;
  titleText?: string;
}

export const TextFilter: React.FC<IProps> = ({
  helperText,
  titleText,
  onValueChange,
  ...props
}) => {
  const handleChange = _.debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onValueChange(event.target.value);
  }, 500);

  return (
    <Box sx={styles.block}>
      {titleText && <InputLabel sx={styles.label}>{titleText}</InputLabel>}
      <InputBase
        sx={styles.input}
        type="text"
        autoComplete="off"
        autoFocus
        onChange={handleChange}
        placeholder={`Type text`}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  );
};
