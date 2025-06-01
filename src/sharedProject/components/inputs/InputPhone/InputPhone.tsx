import { FC, memo, ReactElement, useMemo } from 'react';
import { NumberFormatValues, OnValueChange, PatternFormat } from 'react-number-format';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { colors } from 'mui/theme/colors';

import styles from './styles';
import IProps from './types';

const InputPhone: FC<IProps> = ({
  helperText,
  titleText,
  invalid = false,
  isTestMode = false,
  ...props
}): ReactElement => {
  const stylesUm = useMemo(() => {
    return styles(props?.readOnly || false);
  }, [props.readOnly]);

  const handleValueChange = ({ floatValue }: NumberFormatValues) => {
    if (props.onChange) {
      const event = {
        target: {
          value: `${floatValue}`
        }
      };

      props.onChange(event as React.ChangeEvent<HTMLInputElement>);
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
        <Box sx={stylesUm.input}>
          <PatternFormat
            customInput={InputBase}
            format={isTestMode ? '+##################' : '+1 (###) ###-####'}
            mask={isTestMode ? '' : '_'}
            fullWidth
            onBlur={props.onBlur}
            onValueChange={handleValueChange}
            placeholder={props.placeholder || '+1 (___) ___-____'}
            value={checkFormat(props?.value as string)}
            type="tel"
            readOnly={props.readOnly}
          />
        </Box>

        <FormHelperText error={invalid}>{helperText}</FormHelperText>
      </Box>
    </>
  );

  function checkFormat(value?: string) {
    if (value?.startsWith('+1')) {
      return value.slice(2);
    }
    return value;
  }
};

export default memo(InputPhone);
