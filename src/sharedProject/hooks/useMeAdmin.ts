import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import AppContext from 'appContext';
import { IUserModel } from 'graphql/_server';
import { ME_ADMIN } from 'graphql/queries/meAdmin';

const useMeAdmin = (query = ME_ADMIN) => {
  const { token } = useContext(AppContext);
  const {
    data,
    loading: loadingMe,
    refetch
  } = useQuery<{ meAdmin: IUserModel }>(query, {
    skip: !token
  });
  const dataMe = data?.meAdmin;

  const isLoggedIn = Boolean(dataMe?.id);

  return { dataMe, isLoggedIn, loadingMe, refetch };
};

export default useMeAdmin;
