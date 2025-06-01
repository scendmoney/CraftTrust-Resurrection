import { SelectProps } from '@mui/material/Select';

export type TSelectWithSearchOptions = {
  value: string | number;
  label: string;
  logo?: string | undefined | null;
};

interface IProps extends SelectProps {
  helperText?: string;
  titleText?: string;
  invalid?: boolean;
  options: TSelectWithSearchOptions[];
  isDark?: boolean;
  onValueChange: (value: TSelectWithSearchOptions | undefined) => void;
  onOptionsSearch: (text: string) => void;
  loading?: boolean;
  value?: TSelectWithSearchOptions;
}

export default IProps;
