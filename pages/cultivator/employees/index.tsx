import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorEmployees from 'components/Cultivator/CultivatorEmployees/CultivatorEmployees';

const EmployeesPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Employees Cultivator - {seo.name}</title>
      </Head>
      <CultivatorEmployees />
    </>
  );
};

export default EmployeesPage;
