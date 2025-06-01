import { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { ICartModel, IMutationCheckoutStartedTrackArgs, IQueryCartByIdArgs } from 'graphql/_server';
import CHECKOUT_STARTED_TRACK from 'graphql/mutations/checkoutStartedTrack';
import CART_BY_ID from 'graphql/queries/cartById';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import useEffectOnlyOnce from 'sharedProject/hooks/useEffectOnlyOnce';
import seo from 'sharedProject/seo';

import ClientCheckout from 'components/Client/ClientCheckout/ClientCheckout';
import Loader from 'components/Loader/Loader';

const CheckoutPage: FC = () => {
  const router = useRouter();
  const cartId = nextRouterQueryCheckId(router?.query?.id);
  const [cart, setCart] = useState<ICartModel>();

  const { loading } = useQuery<{ cartById: ICartModel }, IQueryCartByIdArgs>(CART_BY_ID, {
    variables: {
      payload: {
        id: cartId
      }
    },
    onCompleted: (data) => {
      const item = data.cartById;
      setCart(item);
    }
  });

  const [checkoutStartedTrack] = useMutation<
    { checkoutStartedTrack: boolean },
    IMutationCheckoutStartedTrackArgs
  >(CHECKOUT_STARTED_TRACK);

  const checkoutTrackHandle = () => {
    if (cartId) {
      checkoutStartedTrack({
        variables: {
          cartId: cartId
        }
      });
    }
  };

  useEffectOnlyOnce(checkoutTrackHandle, Boolean(cartId));

  useCustomerIoAnalytics(Boolean(cartId), {
    cartId: cartId
  });

  if (loading) {
    return <Loader />;
  }

  if (!cartId) {
    return <>Wrong id!</>;
  }

  if (!cart) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Typography variant="h4">Cart does not exist</Typography>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - {seo.name}</title>
      </Head>
      <Fade in={!loading} timeout={1200}>
        <Box>
          <ClientCheckout cart={cart} />
        </Box>
      </Fade>
    </>
  );
};

export default CheckoutPage;
