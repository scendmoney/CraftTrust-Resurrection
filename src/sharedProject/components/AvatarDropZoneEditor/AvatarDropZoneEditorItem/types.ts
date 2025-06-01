import { FileExtended } from '../types';

interface IProps {
  asset: FileExtended | undefined;
  removeFile: (file: FileExtended | undefined) => void;
  isSquare?: boolean;
}

export default IProps;
