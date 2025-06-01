import { InputBaseProps } from '@mui/material/InputBase';

interface IProps extends InputBaseProps {
  helperText?: string;
  titleText?: string;
  isTestMode?: boolean | null;
  invalid?: boolean;
}

export default IProps;
