import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { IUserModel } from 'graphql/_server';
import { ME_USER_CONTEXT_PROFILE } from 'graphql/queries/me';
import useIsInitialLoaded from 'sharedArchitech/hooks/useIsInitialLoaded/useIsInitialLoaded';

import Loader from 'components/Loader/Loader';

import CultivatorFacilityProfile from './CultivatorFacilityProfile';

const CultivatorFacilityProfileWrapper: FC = () => {
  const { isInitialLoaded, setIsInitialLoaded } = useIsInitialLoaded();

  const { data } = useQuery<{ me: IUserModel }>(ME_USER_CONTEXT_PROFILE, {
    onCompleted: () => {
      setIsInitialLoaded();
    }
  });

  const dataMe = data?.me;

  if (!isInitialLoaded) {
    return <Loader />;
  }

  if (!dataMe) {
    return null;
  }

  return (
    <>
      <CultivatorFacilityProfile initialData={dataMe} />
    </>
  );
};

export default CultivatorFacilityProfileWrapper;
