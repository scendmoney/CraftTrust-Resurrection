import { FC, useMemo } from 'react';
import { FacilityRoleEnum } from 'graphql/_server';
import Routes from 'routes';

import AuthFinalStep from '../shared/components/AuthFinalStep/AuthFinalStep';
import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';
import useSignUpStep from '../shared/hooks/useSignUpStep';

import Step1 from './Step1/Step1';

const JoinEmployee: FC<{ code: string }> = ({ code }) => {
  const { currentStep, goToStep, user } = useSignUpStep();

  const redirectRoleUm = useMemo(() => {
    const isHasCultivator =
      user?.context?.role === FacilityRoleEnum.BuyerAndCultivator ||
      user?.context?.role === FacilityRoleEnum.Cultivator;

    return isHasCultivator ? Routes.CULTIVATOR_INVENTORY : Routes.CLIENT;
  }, [user?.context]);

  return (
    <AuthWrapper>
      <>
        {currentStep === 1 && <Step1 goToStep={goToStep} code={code} />}
        {currentStep === 2 && <AuthFinalStep redirectTo={redirectRoleUm} />}
      </>
    </AuthWrapper>
  );
};

export default JoinEmployee;
