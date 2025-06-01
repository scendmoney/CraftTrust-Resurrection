import { useEffect, useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

import styles from './styles';

interface DateEditorProps {
  onValueChange: (newValue: string[]) => void;
}

export const DateSelectFilter: React.FC<DateEditorProps> = ({ onValueChange }) => {
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  const handleChange = () => {
    if (dateFrom && dateTo) {
      onValueChange([dateFrom, dateTo]);
    }
  };

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo]);

  return (
    <Box sx={styles.block}>
      <Box sx={styles.container}>
        <Typography variant="body1" fontWeight={'bold'}>
          Select date range
        </Typography>
        <Box sx={styles.datePickers}>
          <DatePicker
            slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
            closeOnSelect
            value={dateFrom ? new Date(dateFrom) : null}
            onChange={(newValue) => {
              setDateFrom(newValue ? format(newValue, 'yyyy-MM-dd') : null);
              handleChange();
            }}
            disableFuture
            formatDensity="dense"
            slotProps={{
              field: {
                clearable: true,
                onClear: () => setDateFrom(null)
              },
              clearButton: { size: 'small' },
              openPickerButton: { size: 'small', color: 'error' },
              openPickerIcon: { fontSize: 'small', sx: {} },

              textField: {
                // error: invalid,
                variant: 'standard',

                sx: styles.inputContainer,
                placeholder: 'FROM',
                fullWidth: true
              }
            }}
          />
          <DatePicker
            slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
            closeOnSelect
            value={dateTo ? new Date(dateTo) : null}
            onChange={(newValue) => {
              setDateTo(newValue ? format(newValue, 'yyyy-MM-dd') : null);
              handleChange();
            }}
            disableFuture
            formatDensity="dense"
            slotProps={{
              field: {
                clearable: true,
                onClear: () => {
                  setDateTo(null);
                }
              },
              clearButton: { size: 'small' },
              openPickerButton: { size: 'small', color: 'error' },
              openPickerIcon: { fontSize: 'small', sx: {} },

              textField: {
                // error: invalid,
                variant: 'standard',

                sx: styles.inputContainer,
                placeholder: 'TO',
                fullWidth: true
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
