import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { IInviteModel, IQueryInviteByCodeArgs } from 'graphql/_server';
import INVITE_BY_CODE from 'graphql/queries/inviteByCode';
import { useRouter } from 'next/router';
import Routes from 'routes';

import Loader from 'components/Loader/Loader';

import AuthFinalStep from '../shared/components/AuthFinalStep/AuthFinalStep';
import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';
import useSignUpStep from '../shared/hooks/useSignUpStep';

import Step1 from './Step1/Step1';
import { IProps } from './types';

const JoinBuyer: FC<IProps> = ({ code }) => {
  const router = useRouter();
  const { currentStep, goToStep } = useSignUpStep();

  const [inviteByCode, setInviteByCode] = useState<IInviteModel | undefined>(undefined);

  const { loading } = useQuery<{ inviteByCode: IInviteModel }, IQueryInviteByCodeArgs>(
    INVITE_BY_CODE,
    {
      variables: {
        payload: {
          code: String(code)
        }
      },
      onCompleted(data) {
        setInviteByCode(data.inviteByCode);

        if (data.inviteByCode.relationFacility?.owner) {
          toast.success('You successfully accepted the invitation');
          router.push(Routes.CLIENT);
        }
      },
      skip: !code
    }
  );

  if (loading) return <Loader />;
  return (
    <AuthWrapper>
      <>
        {currentStep === 1 && <Step1 goToStep={goToStep} inviteByCode={inviteByCode} code={code} />}
        {/* {currentStep === 2 && <Step2 goToStep={goToStep} code={code} />} */}
        {currentStep === 2 && <AuthFinalStep redirectTo={Routes.CLIENT} />}
      </>
    </AuthWrapper>
  );
};

export default JoinBuyer;
