import { TSignUpGoToStepFun } from 'components/auth/shared/hooks/useSignUpStep';

export type IProps = {
  goToStep: TSignUpGoToStepFun;
  code: string;
};
