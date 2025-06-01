export interface IProps {
  options: IOption[];

  disabled?: boolean;
  initialOption?: string;

  setIsOpen?: (b: boolean) => void;
}

export interface IOption {
  label: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: () => void;
  disabled?: boolean;
}
