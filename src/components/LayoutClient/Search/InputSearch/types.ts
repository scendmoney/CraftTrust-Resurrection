import { ChangeEventHandler } from 'react';

interface IProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: () => void;
  closeHandler: () => void;
}

export default IProps;
