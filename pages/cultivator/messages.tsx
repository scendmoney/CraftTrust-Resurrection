import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorMessages from 'components/Cultivator/CultivatorMessages/CultivatorMessages';

const MessagesPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Messages Cultivator - {seo.name}</title>
      </Head>
      <CultivatorMessages />
    </>
  );
};

export default MessagesPage;
