import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorEmployeeInvites from 'components/Cultivator/CultivatorEmployees/CultivatorEmployeeInvites/CultivatorEmployeeInvites';

const InvitesPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Empoyees Invites Cultivator - {seo.name}</title>
      </Head>
      <CultivatorEmployeeInvites />
    </>
  );
};

export default InvitesPage;
