import { FC } from 'react';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';

import Landing from 'components/Landing/Landing';

const IndexPage: FC = () => {
  useCustomerIoAnalytics(true);
  return <Landing />;
};

export default IndexPage;
