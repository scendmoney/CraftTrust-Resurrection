import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminTransactions from 'components/Admin/AdminTransactions/AdminTransactions';

const TransactionsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Transactions - {seo.name}</title>
      </Head>
      <AdminTransactions />
    </>
  );
};

export default TransactionsPage;
