import { FC } from 'react';
import Box from '@mui/material/Box';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientOrders from 'components/Client/ClientOrders/ClientOrders';

const OrdersPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <Box>
      <Head>
        <title>Orders - {seo.name}</title>
      </Head>
      <ClientOrders onlyDue={false} />
    </Box>
  );
};

export default OrdersPage;
