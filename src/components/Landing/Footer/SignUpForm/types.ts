import { DialogProps } from '@mui/material/Dialog';

export interface IProps extends DialogProps {
  isLoading?: boolean;
  open: boolean;
  close: () => void;
}

export type TInputs = {
  phoneNumber: string;
  name: string;
  companyName: string;
  email: string;
  olcc: string;
};
