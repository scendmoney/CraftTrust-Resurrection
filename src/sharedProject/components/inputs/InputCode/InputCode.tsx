import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  KeyboardEvent,
  memo,
  ReactElement,
  useMemo,
  useRef
} from 'react';
import { Box, FormHelperText, InputBase, InputLabel, Typography } from '@mui/material';
import { colors } from 'mui/theme/colors';

import styles from './styles';
import IProps from './types';

const InputCode: FC<IProps> = ({
  helperText,
  titleText,
  invalid = false,
  value,
  onValueChange,
  ...props
}): ReactElement => {
  const stylesUm = useMemo(() => styles(), []);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const valueUm = useMemo(() => {
    const defaultValue = ['', '', '', ''];

    if (!value || value.length === 0) {
      return defaultValue;
    }

    const splitValue = value.split('').slice(0, 4);
    while (splitValue.length < 4) {
      splitValue.push('');
    }

    return splitValue;
  }, [value]);

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const newCode = [...valueUm];
    newCode[index] = event.target.value;

    if (onValueChange) {
      onValueChange(newCode.join(''));
    }

    if (event.target.value && index < valueUm.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const paste = event.clipboardData.getData('text');
    if (paste) {
      const newCode = paste.slice(0, 6).split('');
      while (newCode.length < 4) {
        newCode.push('');
      }
      onValueChange(newCode.join(''));
      inputRefs.current[newCode.findIndex((val) => val === '')]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      const newCode = [...valueUm];
      if (!newCode[index]) {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        newCode[index] = '';
        onValueChange(newCode.join(''));
      }
    }
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

        <Box sx={stylesUm.container} onPaste={handlePaste}>
          {valueUm.map((value, index) => (
            <InputBase
              key={index}
              placeholder="0"
              value={value}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              inputProps={{
                maxLength: 1,
                sx: stylesUm.inputNumber,
                ref: (el: HTMLInputElement | null) => (inputRefs.current[index] = el)
              }}
            />
          ))}
        </Box>

        {helperText && <FormHelperText error={invalid}>{helperText}</FormHelperText>}
      </Box>
    </>
  );
};

export default memo(InputCode);
