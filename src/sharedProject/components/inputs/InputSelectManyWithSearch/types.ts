import { SelectProps } from '@mui/material/Select';

export type TSelectManyWithSearchOptions = {
  value: string | number;
  label: string;
  logo?: string | undefined | null;
};

interface IProps extends SelectProps {
  helperText?: string;
  titleText?: string;
  invalid?: boolean;
  options: TSelectManyWithSearchOptions[];
  isDark?: boolean;
  onValueChange: (value: TSelectManyWithSearchOptions[] | undefined) => void;
  onOptionsSearch: (text: string) => void;
  loading?: boolean;
  value?: TSelectManyWithSearchOptions[];
}

export default IProps;
