import { FC, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import CachedIcon from '@mui/icons-material/Cached';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Divider, IconButton, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IMutationUpdateOrderPackageArgs,
  IOrderProductModel,
  IProductsModel,
  IQueryProductsCultivatorArgs
} from 'graphql/_server';
import SYNC_PRODUCTS from 'graphql/mutations/syncProducts';
import UPDATE_ORDER_PACKAGE from 'graphql/mutations/updateOrderPackage';
import PRODUCTS_CULTIVATOR from 'graphql/queries/productsCultivator';
import { colors } from 'mui/theme/colors';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import InputSelect from 'sharedProject/components/inputs/InputSelect/InputSelect';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const OrderItemWithPackageId: FC<{ item: IOrderProductModel }> = ({ item }) => {
  const client = useApolloClient();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [syncProducts] = useMutation(SYNC_PRODUCTS);

  const [updateOrderPackage] = useMutation<
    { updateOrderPackage: IOrderProductModel },
    IMutationUpdateOrderPackageArgs
  >(UPDATE_ORDER_PACKAGE);

  const { data, refetch } = useQuery<
    { productsCultivator: IProductsModel },
    IQueryProductsCultivatorArgs
  >(PRODUCTS_CULTIVATOR, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'parent.id',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Number,
            value: [`${item?.parentProduct?.id}`]
          },
          {
            columnName: 'quantityStock',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Number,
            value: [`${item.quantity}`]
          }
        ]
      }
    }
  });

  const itemsMemo = useMemo(() => {
    const items = data?.productsCultivator?.items || [];
    if (item?.parentProduct?.quantityStock === 0 && item.quantity === item.parentProduct.quantity) {
      return [item.parentProduct, ...items];
    }
    return items;
  }, [data?.productsCultivator?.items, item]);

  if (item?.product?.id) {
    return (
      <Box sx={styles.selectedContainer}>
        <Box display="flex" alignItems="center" justifyContent={'space-between'}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalOfferOutlinedIcon />
            <Typography fontWeight={500} variant="subtitle1">
              Package {item?.product?.id}
            </Typography>
          </Box>

          <Typography variant="subtitle1">{item?.quantity} lb</Typography>
        </Box>
        <Box my={2}>
          <Divider light />
        </Box>

        <Box sx={styles.container}>
          <AvatarUncontrolled
            variant="rounded"
            isGrayBackground
            src={item.parentProduct?.thumbnail?.url}
          />
          <Box flexGrow={1} gap={0.1} display="flex" flexDirection={'column'}>
            <Typography fontWeight={500} variant="subtitle1">
              {item.parentProduct?.item?.name}
            </Typography>
            <Typography color={colors.gray5} variant="body1">
              Harvest: {formatDateTimeDateFns(item.parentProduct?.packagedDate)}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="subtitle1" fontWeight={500}>
              <DollarAmountFormatter value={item?.total} />
            </Typography>
            <Typography variant="body1" color={colors.gray5}>
              {item?.quantity} lb
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={styles.containerWrapper}>
        <InputSelect
          startAdornment={
            <Box mr={1}>
              <IconButton size="small" onClick={handleRefetch}>
                <CachedIcon fontSize="small" />
              </IconButton>
            </Box>
          }
          titleText="Package ID"
          value={item.product?.id}
          onChange={handleUpdateOrderPackage}
          options={itemsMemo?.map((item) => {
            return {
              value: item.id,
              label: `${item.item.name}`
            };
          })}
        />

        <Box mb={2} mt={1}>
          <Divider light />
        </Box>

        <Box sx={styles.container}>
          <AvatarUncontrolled
            variant="rounded"
            isGrayBackground
            src={item.parentProduct?.thumbnail?.url}
          />

          <Box flexGrow={1} gap={0.1} display="flex" flexDirection={'column'}>
            <Typography fontWeight={500} variant="subtitle1">
              {item.parentProduct?.item?.name}
            </Typography>
            <Typography color={colors.gray5} variant="body1">
              Harvest: {formatDateTimeDateFns(item.parentProduct?.packagedDate)}
            </Typography>
          </Box>

          <Box textAlign="right">
            <Typography variant="subtitle1" fontWeight={500}>
              <DollarAmountFormatter value={item?.total} />
            </Typography>
            <Typography variant="body1" color={colors.gray5}>
              {item?.quantity} lb
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );

  async function handleRefetch() {
    try {
      startLoading();
      await syncProducts();
      await refetch();
      toast.success('The products are synchronized');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      stopLoading();
    }
  }

  async function handleUpdateOrderPackage(event: SelectChangeEvent<unknown>) {
    try {
      startLoading();
      if (!event.target.value) {
        throw new Error('Error');
      }

      const packageId = event.target.value as number;

      if (!packageId) {
        throw new Error('Error');
      }

      await updateOrderPackage({
        variables: {
          payload: {
            orderProductId: item.id,
            packageId: packageId
          }
        }
      });
      await client.refetchQueries({
        include: ['orderById']
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      stopLoading();
    }
  }
};

export default OrderItemWithPackageId;
