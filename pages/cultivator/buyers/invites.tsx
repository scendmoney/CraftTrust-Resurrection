import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorBuyerInvites from 'components/Cultivator/CultivatorBuyers/CultivatorBuyerInvites/CultivatorBuyerInvites';

const InvitesPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Buyers Invites Cultivator - {seo.name}</title>
      </Head>
      <CultivatorBuyerInvites />
    </>
  );
};

export default InvitesPage;
