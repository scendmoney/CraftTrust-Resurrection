import { Dispatch, FC, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import { IProductModel } from 'graphql/_server';

import ClientProductCard from './ClientProductCard/ClientProductCard';
import styles from './styles';
const ClientProductsCards: FC<{
  products: IProductModel[];
  setProductId?: Dispatch<SetStateAction<number | undefined>>;
  loading: boolean;
}> = ({ products, setProductId }) => {
  return (
    <Box sx={styles.grid}>
      {products.map((product) => (
        <ClientProductCard product={product} key={product.id} setProductId={setProductId} />
      ))}
    </Box>
  );
};

export default ClientProductsCards;
