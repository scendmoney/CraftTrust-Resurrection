import { FileExtended } from 'sharedProject/components/AvatarDropZoneEditor/types';

export type TInputs = {
  logo: FileExtended | null | undefined;
  fullName: string;
  phoneNumber?: string;
};
