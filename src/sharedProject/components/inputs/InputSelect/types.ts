import { SelectProps } from '@mui/material/Select';

export type TSelectOptions = {
  value: string | number;
  label: string;
  logo?: string | undefined | null;
};

type IProps = SelectProps & {
  helperText?: string;
  titleText?: string;
  invalid?: boolean;
  options: TSelectOptions[];
  isDark?: boolean;
};

export default IProps;
