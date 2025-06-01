import { FC, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ICartItemModel, IMutationUpdateCartItemArgs, IUpdateCartInput } from 'graphql/_server';
import UPDATE_CART_ITEM from 'graphql/mutations/updateCartItem';
import _ from 'lodash';
import { colors } from 'mui/theme/colors';
import DeleteIcon from 'resources/iconsMui/DeleteIcon';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import { formatDate } from 'components/Client/ClientProducts/ClientProductsCards/helpers/formatDate';
import Loader from 'components/Loader/Loader';
import ProductPriceCounter from 'components/Product/ProductQuantity/ProductPriceCounter/ProductPriceCounter';

import ProductPriceOutOfStock from './ProductPriceOutOfStock/ProductPriceOutOfStock';
import styles from './styles';

const ClientCartCultivatorsOrder: FC<{
  cartItem: ICartItemModel;
}> = ({ cartItem }) => {
  const client = useApolloClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [updateCartItem] = useMutation<
    { updateCartItem: IUpdateCartInput },
    IMutationUpdateCartItemArgs
  >(UPDATE_CART_ITEM);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const [count, setCount] = useState(cartItem.quantity);

  const debouncedOnValueChange = useRef(
    _.debounce((newValue: number) => {
      updateCartProductQuantity(newValue, cartItem.product.id);
    }, 1000)
  ).current;

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={styles.productWrapper}>
        <Box>
          <AvatarUncontrolled
            src={cartItem?.product?.thumbnail?.url || '/resources/svg/placeholder.svg'}
            variant="rounded"
            isGrayBackground
            type={isMobile ? 64 : 128}
          />
        </Box>

        <Box sx={styles.productInfoWrapper}>
          <Box sx={styles.productName}>
            <ProductPriceOutOfStock cartItem={cartItem} />

            <Box sx={styles.nameWrapper}>
              <Typography variant="h4" fontWeight={500} sx={{ color: colors.black1 }}>
                {cartItem.product.item.name}
              </Typography>
              <Box sx={styles.productPrice}>
                <Typography variant="h4" fontWeight={500} sx={{ color: colors.black1 }}>
                  <DollarAmountFormatter value={cartItem.total} />
                </Typography>
              </Box>
            </Box>

            <Box>
              {cartItem.product.geneticCross && (
                <Typography variant="body1" sx={{ color: colors.gray5 }} fontWeight={500}>
                  Genetic Cross: {cartItem.product.geneticCross}
                </Typography>
              )}

              <Typography variant="body1" sx={{ color: colors.gray5 }} fontWeight={500}>
                Harvest: {formatDate(cartItem.product.packagedDate)}
              </Typography>
            </Box>

            <Box sx={styles.counterWrapper}>
              <ProductPriceCounter
                min={cartItem.product.quantityStockMin}
                max={cartItem.product.quantityStock}
                count={count}
                setCount={(value) => {
                  setCount(value);
                  debouncedOnValueChange(value);
                }}
              />

              <IconButton sx={styles.iconDelete} onClick={deleteCartItem}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
  async function deleteCartItem() {
    try {
      startLoading();
      await updateCartItem({
        variables: {
          payload: {
            cultivatorId: cartItem.product.facility.id,
            productId: cartItem.product.id,
            quantity: 0
          }
        }
      });
      toast.success('Product deleted');
      await client.refetchQueries({
        include: ['carts']
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }

  async function updateCartProductQuantity(countItem: number, productId: number) {
    try {
      startLoading();
      await updateCartItem({
        variables: {
          payload: {
            cultivatorId: cartItem.product.facility.id,
            productId: productId,
            quantity: countItem
          }
        }
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default ClientCartCultivatorsOrder;
