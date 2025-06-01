import { ButtonProps } from '@mui/material/Button';

export interface IProps extends ButtonProps {
  var?: EButtonType;
  disableActiveEffect?: boolean;
  minWidth?: string;
}

export enum EButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Bordered = 'bordered',
  PrimaryBordered = 'PrimaryBordered',
  Text = 'text',
  TextWithIcon = 'textWithIcon',
  Gray = 'gray',
  White = 'white',
  Green = 'green',
  GrayBordered = 'grayBordered',
  WhiteBordered = 'whiteBordered',
  PrimarySmall = 'primarySmall'
}
