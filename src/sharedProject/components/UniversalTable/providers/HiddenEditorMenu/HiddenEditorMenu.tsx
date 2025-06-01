import { FC } from 'react';
import Box from '@mui/material/Box';

interface HiddenEditorProps {
  value: string;
  onValueChange: (newValue: string) => void;
}

const HiddenEditorMenu: FC<HiddenEditorProps> = () => {
  return <Box />;
};

export default HiddenEditorMenu;
