import { FC } from 'react';
import { useQuery } from '@apollo/client';
import CONFIGURATIONS from 'graphql/queries/configurations';
import useMeAdmin from 'sharedProject/hooks/useMeAdmin';

import Loader from 'components/Loader/Loader';

import AdminSettings from './AdminSettings';

const AdminSettingsWrapper: FC = () => {
  const { dataMe } = useMeAdmin();
  const { data, loading } = useQuery<{
    configurations: { commissionOrderBuyer: number; commissionOrderCultivator: number };
  }>(CONFIGURATIONS);

  if (loading) {
    return <Loader />;
  }

  if (!dataMe) {
    return null;
  }

  return <AdminSettings data={data} role={dataMe.role} />;
};

export default AdminSettingsWrapper;
