import { FC, memo, ReactElement, useMemo } from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import styles from './styles';
import IProps from './types';

const InputSelect: FC<IProps> = ({
  helperText,
  titleText,
  invalid = false,
  options,
  ...props
}): ReactElement => {
  const stylesUm = useMemo(() => {
    return styles(props?.readOnly || false);
  }, [props.readOnly]);

  return (
    <>
      <Box sx={stylesUm.block}>
        <InputLabel sx={stylesUm.label}>{titleText}</InputLabel>
        <Select sx={stylesUm.input} displayEmpty {...props}>
          <MenuItem value="" disabled>
            <Typography variant="body1">Select</Typography>
          </MenuItem>
          {options.map((item) => {
            return (
              <MenuItem
                key={item.value}
                value={item.value}
                sx={stylesUm.item}
                disabled={item.disabled}
              >
                {item.logo}
                <Typography variant="body1">{item.label}</Typography>
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error={invalid}>{helperText}</FormHelperText>
      </Box>
    </>
  );
};

export default memo(InputSelect);
