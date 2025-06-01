import { ReactElement } from 'react';

export interface IProps {
  children: ReactElement;
  isOpen: boolean;
  close: () => void;
  isFullwidth?: boolean;
  isSmallWidth?: boolean;
  isOverflowHidden?: boolean;
}

export default IProps;
