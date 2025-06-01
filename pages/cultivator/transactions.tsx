import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorTransactions from '../../src/components/Cultivator/CultivatorTransactions/CultivatorTransactions';

const TransactionsPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Transactions Cultivator - {seo.name}</title>
      </Head>
      <CultivatorTransactions />
    </>
  );
};

export default TransactionsPage;
