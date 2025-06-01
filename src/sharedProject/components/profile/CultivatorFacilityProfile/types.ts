import { FileExtended } from 'sharedProject/components/AvatarDropZoneEditor/types';
import { IAddress } from 'sharedProject/types';

export type TInputs = {
  logo: FileExtended | null | undefined;
  userContactId: string;
  description: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  address?: IAddress | undefined;
  socials: {
    facebook: string;
    instagram: string;
    site: string;
    twitterX: string;
    youtube: string;
  };
  campaignEmail: string;
};

export type TSelectOptions = {
  value: string | number;
  label: string;
  logo?: string | undefined | null;
};
