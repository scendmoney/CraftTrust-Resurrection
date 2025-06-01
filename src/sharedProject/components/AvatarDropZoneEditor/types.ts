import { ReactElement } from 'react';
import { DropzoneProps } from 'react-dropzone';

export interface FilePreview {
  preview: string;
}

export interface FileExtended extends File {
  preview?: string;
}

export type TFileFormat = {
  [key: string]: string[];
};

export interface AssetsDropZoneMuiExtended extends DropzoneProps {
  isError?: boolean;

  formats?: TFileFormat;

  width?: number;
  height?: number;

  value: FileExtended | null | undefined;
  onBlur?: () => void;

  isShowUploadButton?: boolean;

  onChange: (files: FileExtended | null | undefined) => void;

  maxFiles?: number;

  excludeIds?: number[];

  addIcon?: ReactElement;

  isSquare?: boolean;
}
