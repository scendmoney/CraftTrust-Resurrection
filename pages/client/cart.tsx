import { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { ICartModel } from 'graphql/_server';
import CART_VIEWED_TRACK from 'graphql/mutations/cartViewedTrack';
import { CARTS } from 'graphql/queries/carts';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientCart from 'components/Client/ClientCart/ClientCart';
import Loader from 'components/Loader/Loader';

const CartPage: FC = () => {
  const [carts, setCarts] = useState<ICartModel[]>([]);
  const [cartViewedTrack] = useMutation<{ cartViewedTrack: boolean }>(CART_VIEWED_TRACK);
  const { loading } = useQuery<{ carts: ICartModel[] }>(CARTS, {
    onCompleted: (data) => {
      const items = data.carts;
      if (items) {
        const sortedCarts = items.map((cart) => {
          const sortedCartItems = [...cart.cartItems];
          sortedCartItems.sort((a, b) => a.id - b.id);
          return { ...cart, cartItems: sortedCartItems };
        });
        setCarts(sortedCarts);

        cartViewedTrack();
      }
    },
    fetchPolicy: 'network-only'
  });
  useCustomerIoAnalytics(true);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Cart - {seo.name}</title>
      </Head>
      <Fade in={!loading} timeout={1200}>
        <Box>
          <ClientCart carts={carts} />
        </Box>
      </Fade>
    </>
  );
};

export default CartPage;
