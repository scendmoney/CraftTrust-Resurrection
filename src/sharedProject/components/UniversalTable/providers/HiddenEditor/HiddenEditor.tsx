import { FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { colors } from 'mui/theme/colors';

interface HiddenEditorProps {
  value: string;
  onValueChange: (newValue: string) => void;
}

const HiddenEditor: FC<HiddenEditorProps> = () => {
  return (
    <Box pl={1} pr={1.5} flexGrow={1}>
      <TextField
        autoComplete="off"
        fullWidth
        // placeholder="Search"
        size="small"
        variant="standard"
        // sx={styles.input}
        disabled
        sx={{
          '& :before': {
            borderBottomStyle: 'solid!important',
            borderColor: colors.gray4
          }
        }}
      />
    </Box>
  );
};

export default HiddenEditor;
