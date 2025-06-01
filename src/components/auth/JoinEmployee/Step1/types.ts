import { TSignUpGoToStepFun } from 'components/auth/shared/hooks/useSignUpStep';

export type TInputs = {
  licenseNumberEmployee: string;
  email: string;
  fullName: string;
  password: string;
};

export type IProps = {
  code: string;
  goToStep: TSignUpGoToStepFun;
};
