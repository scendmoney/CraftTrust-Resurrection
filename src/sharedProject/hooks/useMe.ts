import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import AppContext from 'appContext';
import { IUserModel } from 'graphql/_server';
import ME from 'graphql/queries/me';

const useMe = (query = ME) => {
  const { token } = useContext(AppContext);
  const {
    data,
    loading: loadingMe,
    refetch
  } = useQuery<{ me: IUserModel }>(query, {
    skip: !token
  });
  const dataMe = data?.me;

  const isLoggedIn = Boolean(dataMe?.id);

  return { dataMe, isLoggedIn, loadingMe, refetch };
};

export default useMe;
