import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { IUserModel } from 'graphql/_server';
import { ME_POFILE_EDIT } from 'graphql/queries/me';
import useIsInitialLoaded from 'sharedArchitech/hooks/useIsInitialLoaded/useIsInitialLoaded';

import Loader from 'components/Loader/Loader';

import UniversalProfile from '../UniversalProfile/UniversalProfile';

const UniversalProfileMeWrapper: FC = () => {
  const { isInitialLoaded, setIsInitialLoaded } = useIsInitialLoaded();

  const { data } = useQuery<{ me: IUserModel }>(ME_POFILE_EDIT, {
    onCompleted: () => {
      setIsInitialLoaded();
    },
    onError: () => {
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
      <UniversalProfile initialData={dataMe} />
    </>
  );
};

export default UniversalProfileMeWrapper;
