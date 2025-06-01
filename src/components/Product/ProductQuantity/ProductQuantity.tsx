import { FC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { Divider, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IMutationUpdateCartItemArgs, IProductModel, IUpdateCartInput } from 'graphql/_server';
import UPDATE_CART_ITEM from 'graphql/mutations/updateCartItem';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import CartIcon from 'resources/iconsMui/CartIcon';
import Routes from 'routes';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import { formatQntMin } from 'components/Client/ClientProducts/ClientProductsCards/helpers/formatQntMin';
import Loader from 'components/Loader/Loader';

import ProductPriceCounter from './ProductPriceCounter/ProductPriceCounter';
import styles from './styles';

const ProductQuantity: FC<{
  product: IProductModel;
  contextId?: string;
  isProductAdded: boolean;
}> = ({ product, contextId, isProductAdded }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const client = useApolloClient();

  const [updateCartItem, { loading }] = useMutation<
    { updateCartItem: IUpdateCartInput },
    IMutationUpdateCartItemArgs
  >(UPDATE_CART_ITEM);

  const [count, setCount] = useState(product.quantityStockMin);
  const [isChanged, setIsChanged] = useState(false);
  const disabledButtons =
    product.quantityStockMin === 0 ||
    product.quantityStock === 0 ||
    product.price === 0 ||
    product.quantityStock < product.quantityStockMin ||
    product.facility.id === contextId ||
    !contextId;
  const priceUm = useMemo(() => {
    return (count * product.price) / 0.25;
  }, [count, product.price]);

  if (!product.quantityStock) {
    return (
      <Box mt={4}>
        <Typography variant="h4" color={colors.red}>
          OUT OF STOCK
        </Typography>
      </Box>
    );
  }

  return isMobile ? (
    <Box sx={styles.containerMobile}>
      {loading && <Loader />}
      <Box sx={styles.availableWrapperMobile}>
        <ProductPriceCounter
          min={product.quantityStockMin}
          max={product.quantityStock}
          count={count}
          setCount={(value: number) => {
            setIsChanged(true);
            setCount(value);
          }}
        />

        <ButtonUi
          var={
            isProductAdded
              ? isChanged
                ? EButtonType.Primary
                : EButtonType.PrimaryBordered
              : EButtonType.Primary
          }
          style={{ height: '40px', fontSize: '16px' }}
          startIcon={isProductAdded ? isChanged ? <CartIcon /> : null : <CartIcon />}
          onClick={isProductAdded ? (isChanged ? onSubmit : goToCart) : onSubmit}
          disabled={disabledButtons}
        >
          {isProductAdded ? (
            isChanged ? (
              <Typography variant="subtitle1" fontWeight={400}>
                <DollarAmountFormatter value={priceUm} />
              </Typography>
            ) : (
              'Go to Cart'
            )
          ) : (
            <Typography variant="subtitle1" fontWeight={400}>
              <DollarAmountFormatter value={priceUm} />
            </Typography>
          )}
        </ButtonUi>
      </Box>
      <Box sx={styles.divider}>
        <Divider />
      </Box>
      <Box sx={styles.priceWrapper}>
        <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray2 }}>
          Min Quantity for Order is {formatQntMin(product.quantityStockMin)} lb {'\u2022'} Available{' '}
          {product.quantityStock} lb
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={styles.container}>
      {loading && <Loader />}
      <Box sx={styles.availableWrapper}>
        <ProductPriceCounter
          min={product.quantityStockMin}
          max={product.quantityStock}
          count={count}
          setCount={(value: number) => {
            setIsChanged(true);
            setCount(value);
          }}
        />
        <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray2 }}>
          Min Quantity for Order is {formatQntMin(product.quantityStockMin)} lb {'\u2022'} Available{' '}
          {product.quantityStock} lb
        </Typography>
      </Box>
      <Box sx={styles.divider}>
        <Divider />
      </Box>
      <Box sx={styles.priceWrapper}>
        <Typography variant="h3" color="secondary">
          <DollarAmountFormatter value={priceUm} />
        </Typography>
        <Box sx={styles.buttonsWrapper}>
          <ButtonUi
            var={isProductAdded ? EButtonType.PrimaryBordered : EButtonType.Primary}
            onClick={isProductAdded ? (isChanged ? onSubmit : goToCart) : onSubmit}
            disabled={disabledButtons}
          >
            {isProductAdded ? (isChanged ? 'Change Quantity' : 'Go to Cart') : 'Add to cart'}
          </ButtonUi>
        </Box>
      </Box>
    </Box>
  );

  async function onSubmit() {
    try {
      await updateCartItem({
        variables: {
          payload: {
            cultivatorId: product.facility.id,
            productId: product.id,
            quantity: Number(count)
          }
        }
      });

      setIsChanged(false);

      await client.refetchQueries({
        include: ['carts']
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function goToCart() {
    try {
      await router.push(Routes.CLIENT_CART);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default ProductQuantity;
