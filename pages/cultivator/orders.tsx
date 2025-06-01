import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorOrders from 'components/Cultivator/CultivatorOrders/CultivatorOrders';

const OrdersPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Orders Cultivator - {seo.name}</title>
      </Head>
      <CultivatorOrders />
    </>
  );
};

export default OrdersPage;
