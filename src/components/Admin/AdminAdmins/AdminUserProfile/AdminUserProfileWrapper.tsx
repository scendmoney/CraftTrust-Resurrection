import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { IUserModel, UserRoleEnum } from 'graphql/_server';
import { USER_BY_ID_ADMIN } from 'graphql/queries/userById';

import Loader from 'components/Loader/Loader';

import AdminUserProfile from './AdminUserProfile';

const AdminUserProfileWrapper: FC<{
  id?: string;
  close: () => Promise<void>;
  contextRole: UserRoleEnum | undefined;
}> = ({ id, close, contextRole }) => {
  const [userById, setUserById] = useState<IUserModel | undefined>(undefined);
  const { loading } = useQuery<{ userById: IUserModel }>(USER_BY_ID_ADMIN, {
    variables: {
      payload: {
        id: id
      }
    },
    onCompleted: (data) => {
      setUserById(data.userById);
    },
    skip: Boolean(!id)
  });

  if (loading) {
    return <Loader />;
  }

  if (!userById) {
    return null;
  }

  return (
    <AdminUserProfile close={close} contextRole={contextRole} user={userById} loading={loading} />
  );
};

export default AdminUserProfileWrapper;
