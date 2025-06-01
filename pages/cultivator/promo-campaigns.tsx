import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorPromoCompanies from 'components/Cultivator/CultivatorPromoCompanies/CultivatorPromoCompanies';

const CultivatorPromoCompaniesPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Campaigns Cultivator - {seo.name}</title>
      </Head>
      <CultivatorPromoCompanies />
    </>
  );
};

export default CultivatorPromoCompaniesPage;
