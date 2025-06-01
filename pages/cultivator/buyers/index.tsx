import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorBuyers from 'components/Cultivator/CultivatorBuyers/CultivatorBuyers';

const BuyersPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Buyers - {seo.name}</title>
      </Head>
      <CultivatorBuyers />
    </>
  );
};

export default BuyersPage;
