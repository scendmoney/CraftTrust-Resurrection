import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminOrders from 'components/Admin/AdminOrders/AdminOrders';

const OrdersPage: FC = () => {
  return (
    <>
      <Head>
        <title>Orders - {seo.name}</title>
      </Head>
      <AdminOrders />
    </>
  );
};

export default OrdersPage;
