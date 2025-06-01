import { useEffect, useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { InputLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { colors } from 'mui/theme/colors';

import styles from './styles';
interface DateEditorProps {
  value: string;
  onValueChange: (newValue: string) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  helperText?: string;
  invalid?: boolean;
  placeholder?: string;
  titleText?: string;
  required?: boolean;
}

export const InputDate: React.FC<DateEditorProps> = ({
  value,
  onValueChange,
  disablePast,
  disableFuture,
  helperText,
  invalid,
  placeholder,
  titleText,
  required
}) => {
  const [dateValue, setDateValue] = useState<Date | null>(value ? new Date(value) : null);

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
    if (isDateValid(newValue)) {
      const formattedDate = newValue ? format(newValue, 'yyyy-MM-dd') : '';
      onValueChange(formattedDate);
    }
  };

  const [cleared, setCleared] = useState<boolean>(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <Box flexGrow={1}>
      {required ? (
        <Box sx={styles.required}>
          <InputLabel sx={styles.label}>{titleText}</InputLabel>
          <Typography sx={{ color: colors.secondary }}> *</Typography>
        </Box>
      ) : (
        <InputLabel sx={styles.label}>{titleText}</InputLabel>
      )}
      <DatePicker
        value={dateValue}
        timezone="system"
        onChange={handleChange}
        slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
        sx={styles.picker}
        disablePast={disablePast}
        disableFuture={disableFuture}
        slotProps={{
          field: {
            clearable: true,
            onClear: () => setCleared(true)
          },
          clearButton: { size: 'small' },
          openPickerButton: { size: 'small', color: 'error' },
          openPickerIcon: { fontSize: 'small', sx: {} },

          textField: {
            error: invalid,
            variant: 'outlined',

            sx: styles.inputContainer,
            placeholder: placeholder,
            fullWidth: true
          }
        }}
      />
      <FormHelperText error={invalid}>{helperText}</FormHelperText>
    </Box>
  );
};

function isDateValid(date: Date | null) {
  return !isNaN(Number(date));
}
