import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import AppContext from 'appContext';
import type { IUserModel } from 'graphql/_server';
import { ME_CLIENT } from 'graphql/queries/meClient';

const useMeClient = (query = ME_CLIENT) => {
  const { token } = useContext(AppContext);
  const {
    data,
    loading: loadingMe,
    refetch
  } = useQuery<{ meClient: IUserModel }>(query, {
    skip: !token
  });
  const dataMe = data?.meClient;

  const isLoggedIn = Boolean(dataMe?.id);

  return { dataMe, isLoggedIn, loadingMe, refetch };
};

export default useMeClient;
