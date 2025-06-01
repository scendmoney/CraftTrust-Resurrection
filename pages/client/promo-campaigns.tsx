import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientPromoCompanies from 'components/Client/ClientPromoCompanies/ClientPromoCompanies';

const ClientPromoCompaniesPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Campaigns - {seo.name}</title>
      </Head>
      <ClientPromoCompanies />
    </>
  );
};

export default ClientPromoCompaniesPage;
