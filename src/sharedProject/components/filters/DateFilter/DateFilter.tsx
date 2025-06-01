import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { subDays } from 'date-fns';

import styles from './styles';

interface DateEditorProps {
  onValueChange: (newValue: string[]) => void;
  titleText?: string;
}

export const DateFilter: React.FC<DateEditorProps> = ({ onValueChange, titleText }) => {
  const handleChange = (days: number) => {
    const currentDate = new Date();
    const pastDate = subDays(currentDate, days);
    onValueChange([pastDate.toISOString(), currentDate.toISOString()]);
  };

  return (
    <Box sx={styles.block}>
      {titleText && <InputLabel sx={styles.label}>{titleText}</InputLabel>}
      <Button sx={styles.button} onClick={() => handleChange(7)}>
        Last 7 days
      </Button>
      <Button sx={styles.button} onClick={() => handleChange(30)}>
        Last 30 days
      </Button>
    </Box>
  );
};
