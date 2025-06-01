import { FileExtended } from 'sharedProject/components/AvatarDropZoneEditor/types';
import { IAddress } from 'sharedProject/types';

import { TSignUpGoToStepFun } from 'components/auth/shared/hooks/useSignUpStep';

export type TInputs = {
  description: string;
  email: string;
  phoneNumber: string;
  address?: IAddress | undefined;
  logo: FileExtended;
};

export type IProps = {
  goToStep: TSignUpGoToStepFun;
};
