import { FC } from 'react';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';

import Client from 'components/Client/Client';

const ClientPage: FC = () => {
  useCustomerIoAnalytics(true);
  return <Client />;
};

export default ClientPage;
