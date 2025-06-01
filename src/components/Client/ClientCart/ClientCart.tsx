import { FC, useMemo } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { ICartModel } from 'graphql/_server';

import ClientFaq from '../shared/ClientFaq/ClientFaq';

import ClientCartCultivatorsOrders from './ClientCartCultivatorsOrders/ClientCartCultivatorsOrders';
import styles from './styles';

const ClientCart: FC<{ carts: ICartModel[] }> = ({ carts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isCartsEmpty = useMemo(() => {
    return carts.every((cart) => cart.cartItems.length === 0 || !carts.length);
  }, [carts]);
  return (
    <Box sx={styles.wrapper}>
      <Typography variant={isMobile ? 'h2' : 'h1'}>Cart</Typography>

      <Box sx={styles.blockWrapper}>
        {!isCartsEmpty ? (
          <Box sx={styles.contentWrapper}>
            {carts.map((cart) => (
              <ClientCartCultivatorsOrders cart={cart} key={cart.id} />
            ))}
          </Box>
        ) : (
          <Typography variant="h3" fontWeight={500}>
            Curently, there are no items in your cart.
          </Typography>
        )}

        <ClientFaq />
      </Box>
    </Box>
  );
};

export default ClientCart;
