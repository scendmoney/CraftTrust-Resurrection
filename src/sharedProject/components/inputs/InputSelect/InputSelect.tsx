import { FC, memo, ReactElement, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
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
  isDark = false,
  ...props
}): ReactElement => {
  const stylesUm = useMemo(() => {
    return styles(props?.readOnly || false, isDark);
  }, [props.readOnly, isDark]);

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
              <MenuItem key={item.value} value={item.value} sx={stylesUm.item}>
                {item?.logo &&
                  (item.logo.length > 1 ? (
                    <Avatar alt={item.label} src={item.logo} sx={stylesUm.avatar} />
                  ) : (
                    <Avatar alt={item.label} src={undefined} sx={stylesUm.avatar} />
                  ))}
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
