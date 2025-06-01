import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';

interface SelectEditorProps {
  onValueChange: (newValue: string) => void;
  valueIsLabel?: boolean;
  statuses: {
    value: string;
    label: string;
    logo?: string;
  }[];
}

export const EnumFilter: React.FC<SelectEditorProps> = ({
  onValueChange,
  statuses,
  valueIsLabel = false
}) => {
  const handleChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <Box sx={styles.block}>
      <MenuItem value="" disabled>
        <Typography variant="body1" fontWeight={500}>
          Select
        </Typography>
      </MenuItem>
      {statuses.map((status) => (
        <MenuItem
          key={status.label}
          value={valueIsLabel ? status.label : status.value}
          onClick={() => handleChange(valueIsLabel ? status.label : status.value)}
          sx={{ gap: 1 }}
        >
          {status.logo && <AvatarUncontrolled src={status.logo || undefined} type={24} />}
          <Typography variant="body1" fontWeight={500}>
            {status.label}
          </Typography>
        </MenuItem>
      ))}
    </Box>
  );
};
