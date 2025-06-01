import { Dispatch, SetStateAction } from 'react';

import { FileExtended } from '../types';

export interface IProps {
  file: FileExtended | null | undefined;
  setFile: (file: FileExtended | null | undefined) => void;

  width: number;
  height: number;
  isSquare?: boolean;

  temporaryFile: '' | File;
  setTemporaryFile: Dispatch<SetStateAction<'' | File>>;
}
