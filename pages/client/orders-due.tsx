import { FC } from 'react';
import Box from '@mui/material/Box';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientOrders from 'components/Client/ClientOrders/ClientOrders';

const OrdersDuePage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <Box>
      <Head>
        <title>Orders - {seo.name}</title>
      </Head>
      <ClientOrders onlyDue />
    </Box>
  );
};

export default OrdersDuePage;
