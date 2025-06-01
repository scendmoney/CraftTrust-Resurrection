import { FC, memo, ReactElement, useMemo, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { colors } from 'mui/theme/colors';

import styles from './styles';
import IProps from './types';

const InputText: FC<IProps> = ({
  helperText,
  titleText,
  isPassword = false,
  invalid = false,
  ...props
}): ReactElement => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(isPassword);
  const stylesUm = useMemo(() => {
    return styles(props?.readOnly || false);
  }, [props.readOnly]);
  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
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
        <InputBase
          sx={stylesUm.input}
          type={isShowPassword ? 'password' : 'text'}
          autoComplete="off"
          endAdornment={
            isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {isShowPassword ? (
                    <Visibility fontSize="small" />
                  ) : (
                    <VisibilityOff fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null
          }
          {...props}
        />
        <FormHelperText error={invalid}>{helperText}</FormHelperText>
      </Box>
    </>
  );
};

export default memo(InputText);
