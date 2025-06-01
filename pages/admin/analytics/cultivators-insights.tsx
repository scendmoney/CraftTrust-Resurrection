import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminCultivatorsInsights from 'components/Admin/AdminAnalytics/AdminCultivatorsInsights/AdminCultivatorsInsights';

const AdminCultivatorsInsightsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Cultivator Insights - {seo.name}</title>
      </Head>
      <AdminCultivatorsInsights />
    </>
  );
};

export default AdminCultivatorsInsightsPage;
