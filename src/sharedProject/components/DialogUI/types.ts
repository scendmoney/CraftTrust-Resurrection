import { ReactElement } from 'react';
import { DialogProps } from '@mui/material/Dialog';

export interface IProps extends DialogProps {
  isLoading?: boolean;
  children: ReactElement;

  buttonSubmit?: () => void;
  buttonSubmitText?: string;

  buttonSubmit2?: () => void;
  buttonSubmitText2?: string;

  close: () => void;
  buttonCancelText?: string;

  hideButtons?: boolean;

  title?: string;

  hideCloseButton?: boolean;

  minWidthVw?: number;
  minHeightVh?: number;
  hidePaddings?: boolean;
}
