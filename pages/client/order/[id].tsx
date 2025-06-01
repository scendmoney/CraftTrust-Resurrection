import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { IOrderModel, IQueryOrderByIdArgs } from 'graphql/_server';
import ORDER_BY_ID from 'graphql/queries/orderById';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientOrderById from 'components/Client/ClientOrderById/ClientOrderById';
import Loader from 'components/Loader/Loader';

const OrderPage: FC = () => {
  const router = useRouter();
  const orderId = nextRouterQueryCheckId(router?.query?.id);
  const [order, setOrder] = useState<IOrderModel>();

  const { loading } = useQuery<{ orderById: IOrderModel }, IQueryOrderByIdArgs>(ORDER_BY_ID, {
    variables: {
      payload: {
        id: orderId
      }
    },
    onCompleted: (data) => {
      const item = data.orderById;
      setOrder(item);
    }
  });

  useCustomerIoAnalytics(Boolean(orderId), {
    orderId: orderId
  });

  if (loading) {
    return <Loader />;
  }

  if (!orderId) {
    return <>Wrong id!</>;
  }

  if (!order) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Order - {seo.name}</title>
      </Head>
      <Fade in={!loading} timeout={1200}>
        <Box>
          <ClientOrderById order={order} />
        </Box>
      </Fade>
    </>
  );
};

export default OrderPage;
