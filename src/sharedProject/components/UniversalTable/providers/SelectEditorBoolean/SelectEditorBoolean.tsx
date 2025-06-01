import { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import styles from './styles';

interface SelectEditorProps {
  value: boolean | string;
  onValueChange: (newValue: boolean | string) => void;
  statuses: {
    value: boolean | string;
    label: string;
  }[];
}

const SelectEditorBoolean: FC<SelectEditorProps> = ({ value, onValueChange, statuses }) => {
  const handleChange = (event: SelectChangeEvent<boolean | string>) => {
    if (event.target.value === 'All') {
      onValueChange('');
    } else {
      onValueChange(JSON.parse(String(event.target.value).toLowerCase()));
    }
  };

  const stylesUm = useMemo(() => {
    return styles(value);
  }, [value]);

  return (
    <FormControl fullWidth variant="standard" size="small">
      <Box pl={1} pr={1.5} flexGrow={1}>
        <Select
          fullWidth
          labelId="status-select-label"
          id="status-select"
          value={value}
          defaultValue="All"
          onChange={handleChange}
          placeholder="Status"
          sx={stylesUm.input}
        >
          <MenuItem value="" disabled>
            <Typography variant="body1" fontWeight={500}>
              Select
            </Typography>
          </MenuItem>
          <MenuItem value={'All'}>
            <Typography variant="body1" fontWeight={500}>
              All
            </Typography>
          </MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status.label} value={String(status.value)}>
              <Typography variant="body1" fontWeight={500}>
                {status.label}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
};

export default SelectEditorBoolean;
