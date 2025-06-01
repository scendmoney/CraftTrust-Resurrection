import { FC } from 'react';

import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';
import useSignUpStep from '../shared/hooks/useSignUpStep';

import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';

const JoinCultivator: FC<{ code: string }> = ({ code }) => {
  const { currentStep, goToStep } = useSignUpStep();

  return (
    <AuthWrapper>
      <>
        {currentStep === 1 && <Step1 goToStep={goToStep} code={code} />}
        {currentStep === 2 && <Step2 goToStep={goToStep} />}
        {currentStep === 3 && <Step3 />}
      </>
    </AuthWrapper>
  );
};

export default JoinCultivator;
