import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminBuyersInsights from 'components/Admin/AdminAnalytics/AdminBuyersInsights/AdminBuyersInsights';

const AdminBuyersInsightsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Buyer Insights - {seo.name}</title>
      </Head>
      <AdminBuyersInsights />
    </>
  );
};

export default AdminBuyersInsightsPage;
