import { SelectProps } from '@mui/material/Select';

export type TSelectOptions = {
  value: string;
  label: string;
  logo: JSX.Element;
  disabled: boolean;
};

interface IProps extends SelectProps {
  helperText?: string;
  titleText?: string;
  invalid?: boolean;
  options: TSelectOptions[];
}

export default IProps;
