interface IProps {
  id: number;
  title: string;
  facility: string;
  logoUrl: string | undefined;
  close: () => void;
}

export default IProps;
