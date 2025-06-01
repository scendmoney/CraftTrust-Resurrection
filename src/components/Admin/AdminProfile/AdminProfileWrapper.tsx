import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { IUserModel } from 'graphql/_server';
import { ME_ADMIN } from 'graphql/queries/meAdmin';

import Loader from 'components/Loader/Loader';

import AdminProfile from './AdminProfile';

const AdminProfileWrapper: FC = () => {
  const [formData, setFormData] = useState<IUserModel>();

  const { loading } = useQuery<{ meAdmin: IUserModel }>(ME_ADMIN, {
    variables: {
      payload: {
        isCultivator: false
      }
    },
    onCompleted: (data) => {
      const dataMe = data.meAdmin;
      setFormData(dataMe);
    }
  });

  if (loading || !formData) {
    return <Loader />;
  }

  return <AdminProfile formData={formData} loading={loading} />;
};

export default AdminProfileWrapper;
