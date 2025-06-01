import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientTransactions from 'components/Client/ClientTransactions/ClientTransactions';

const TransactionsPage: FC = () => {
  useCustomerIoAnalytics(true);

  return (
    <>
      <Head>
        <title>Transactions - {seo.name}</title>
      </Head>
      <ClientTransactions />
    </>
  );
};

export default TransactionsPage;
