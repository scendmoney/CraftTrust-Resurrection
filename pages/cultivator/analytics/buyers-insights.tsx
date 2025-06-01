import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorBuyersInsights from 'components/Cultivator/CultivatorAnalytics/CultivatorBuyersInsights/CultivatorBuyersInsights';

const CultivatorBuyersInsightsPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Buyers Insights - {seo.name}</title>
      </Head>
      <CultivatorBuyersInsights />
    </>
  );
};

export default CultivatorBuyersInsightsPage;
