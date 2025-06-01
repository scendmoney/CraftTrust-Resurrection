import React from 'react';
import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import _ from 'lodash';

import InputText from '../../inputs/InputText/InputText';

import styles from './styles';

interface IProps {
  onValueChange: (value: string) => void;
  helperText?: string;
  titleText?: string;
}

export const NumberFilter: React.FC<IProps> = ({
  helperText,
  titleText,
  onValueChange,
  ...props
}) => {
  const handleChange = _.debounce((value: string) => {
    onValueChange(value);
  }, 500);

  return (
    <Box sx={styles.block}>
      {titleText && <InputLabel sx={styles.label}>{titleText}</InputLabel>}
      <NumericFormat
        customInput={InputText}
        onValueChange={(data) => handleChange(data.value)}
        placeholder={`Type order id`}
        prefix="#"
        autoComplete="off"
        autoFocus
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  );
};
