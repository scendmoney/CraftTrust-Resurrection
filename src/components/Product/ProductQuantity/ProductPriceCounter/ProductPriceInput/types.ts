import { InputBaseProps } from '@mui/material/InputBase';

interface IProps extends InputBaseProps {
  helperText?: string;
  invalid?: boolean;
  titleText?: string;
}

export default IProps;
