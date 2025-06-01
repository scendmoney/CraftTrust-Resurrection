import { IInviteModel } from 'graphql/_server';

import { TSignUpGoToStepFun } from 'components/auth/shared/hooks/useSignUpStep';

export type TInputs = {
  email: string;
  licenseNumberEmployee: string;
  licenseNumberFacility: string;
  metrcApiKey?: string;
  password: string;
};

export type IProps = {
  goToStep: TSignUpGoToStepFun;
  code: string;
  inviteByCode: IInviteModel | undefined;
};
