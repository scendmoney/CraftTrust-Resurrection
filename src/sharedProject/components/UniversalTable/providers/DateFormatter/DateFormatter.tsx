import { useEffect, useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';

import styles from './styles';
interface DateEditorProps {
  value: string;
  onValueChange: (newValue: string) => void;
}

export const DateFormatter: React.FC<{ value: string; showTime?: boolean }> = ({
  value,
  showTime = false
}) => {
  return <>{formatDateTimeDateFns(value, showTime)}</>;
};

export const DateEditor: React.FC<DateEditorProps> = ({ value, onValueChange }) => {
  const [dateValue, setDateValue] = useState<Date | null>(value ? new Date(value) : null);

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
    if (isDateValid(newValue)) {
      const formattedDate = newValue ? format(newValue, "yyyy-MM-dd'T'HH:mm:ss") : '';
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
    <Box pl={1} pr={1.5} flexGrow={1}>
      <DatePicker
        value={dateValue}
        onChange={handleChange}
        slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
        slotProps={{
          field: { clearable: true, onClear: () => setCleared(true) },
          clearButton: { size: 'small' },
          openPickerButton: { size: 'small' },
          openPickerIcon: { fontSize: 'small', sx: { width: '16px', height: '16px' } },
          textField: {
            variant: 'standard',
            size: 'small',
            sx: styles.inputContainer,
            placeholder: 'Date',
            fullWidth: true
          }
        }}
      />
    </Box>
  );
};

function isDateValid(date: Date | null) {
  return !isNaN(Number(date));
}
