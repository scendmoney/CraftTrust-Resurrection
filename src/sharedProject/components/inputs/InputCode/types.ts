import { InputBaseProps } from '@mui/material/InputBase';

interface IProps extends InputBaseProps {
  helperText?: string;
  invalid?: boolean;
  titleText?: string;
  value: string;
  onValueChange: (value: string) => void;
}

export default IProps;
