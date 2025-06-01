import { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Divider, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  ICartModel,
  IMutationProductViewedTrackArgs,
  IProductModel,
  IProductsModel,
  IQueryProductByIdBuyerArgs,
  IQueryProductsBuyerArgs
} from 'graphql/_server';
import PRODUCT_VIEWED_TRACK from 'graphql/mutations/productViewedTrack';
import { CARTS_PRODUCT_ID } from 'graphql/queries/carts';
import PRODUCT_BY_ID_BUYER from 'graphql/queries/productByIdBuyer';
import PRODUCTS_BUYER from 'graphql/queries/productsBuyer';
import { colors } from 'mui/theme/colors';
import Head from 'next/head';
import Routes from 'routes';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import FacilityHeaderInfo from 'sharedProject/components/FacilityHeaderInfo/FacilityHeaderInfo';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import useEffectOnlyOnce from 'sharedProject/hooks/useEffectOnlyOnce';
import useMe from 'sharedProject/hooks/useMe';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import seo from 'sharedProject/seo';

import ClientProductsCards from 'components/Client/ClientProducts/ClientProductsCards/ClientProductsCards';
import Loader from 'components/Loader/Loader';

import ProductLabTested from './ProductLabTested/ProductLabTested';
import ProductQuantity from './ProductQuantity/ProductQuantity';
import styles from './styles';

const Product: FC<{ productId: number }> = ({ productId }) => {
  const { goTo } = useProjectRouter();
  const { dataMe } = useMe();
  const [product, setProduct] = useState<IProductModel>();
  const [productsByFacilites, setProductsByFacilites] = useState<IProductModel[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { loading } = useQuery<{ productByIdBuyer: IProductModel }, IQueryProductByIdBuyerArgs>(
    PRODUCT_BY_ID_BUYER,
    {
      variables: {
        payload: {
          id: productId
        }
      },
      onCompleted: (data) => {
        const item = data.productByIdBuyer;
        setProduct(item);
      },
      fetchPolicy: 'network-only'
    }
  );

  const [productViewedTrack] = useMutation<
    { productViewedTrack: boolean },
    IMutationProductViewedTrackArgs
  >(PRODUCT_VIEWED_TRACK);

  const productViewedHandle = () => {
    if (productId) {
      productViewedTrack({
        variables: {
          productId: productId
        }
      });
    }
  };

  useEffectOnlyOnce(productViewedHandle, Boolean(productId));

  useCustomerIoAnalytics(Boolean(product), {
    productId,
    facilityCultivatorId: product?.facility?.id
  });

  const { loading: loadingFacilitesProducts } = useQuery<
    { productsBuyer: IProductsModel },
    IQueryProductsBuyerArgs
  >(PRODUCTS_BUYER, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'facility.id',
            type: FilterFieldTypeEnum.Text,
            operation: FilterOperationEnum.Equal,
            value: [String(product?.facility.id)]
          },
          {
            columnName: 'id',
            type: FilterFieldTypeEnum.Text,
            operation: FilterOperationEnum.NotEqual,
            value: [String(productId)]
          },
          {
            columnName: 'quantityStock',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Number,
            value: ['0']
          }
        ],
        paginate: {
          take: 4,
          skip: 0
        }
      }
    },
    onCompleted: (data) => {
      const items = data?.productsBuyer.items || [];

      setProductsByFacilites([...items]);
    }
  });

  const [isProductAdded, setIsProductAdded] = useState<boolean>(false);

  useQuery<{ carts: ICartModel[] }>(CARTS_PRODUCT_ID, {
    onCompleted: (data) => {
      if (data.carts.length) {
        if (productId) {
          const productIds = getProductIds(data.carts);
          const isProductAdded = productIds.includes(productId);
          setIsProductAdded(isProductAdded);
        }
      }
    }
  });

  if (loading || loadingFacilitesProducts) {
    return <Loader />;
  }

  if (!product) return null;

  return (
    <>
      <Head>
        <title>
          {product?.item?.name || 'Product'} - {seo.name}
        </title>
      </Head>

      <Box sx={styles.productWrapper}>
        <Box>
          <Box
            component={'img'}
            src={product?.thumbnail?.url || '/resources/placeholder.png'}
            sx={styles.thumbnail}
            alt={product?.label}
          />
        </Box>

        <Box sx={styles.productContent}>
          <Typography variant="h3" color="secondary">
            {product?.geneticCross}
          </Typography>
          <Typography variant="h1">{product?.item.name}</Typography>
          <Typography variant="subtitle1" fontWeight={500}>
            {product?.description}
          </Typography>
          <ProductLabTested product={product} />
          {dataMe?.context && (
            <ProductQuantity
              product={product}
              contextId={dataMe?.context.id}
              isProductAdded={isProductAdded}
            />
          )}
        </Box>
      </Box>
      <Box sx={styles.facilityWrapper}>
        <Box sx={styles.facilityContentWrapper}>
          <FacilityHeaderInfo facilityById={product.facility} isShowDivider={false} />
        </Box>
        <Box sx={styles.facilityCardsWrapper}>
          <Box mb={6}>
            <Divider light />
          </Box>
          <Box sx={styles.moreCardTitle}>
            <Typography variant={isMobile ? 'h4' : 'h2'} fontWeight={500}>
              More by {product?.facility.displayName}
            </Typography>
            {!isMobile && (
              <ButtonUi
                var={EButtonType.Text}
                onClick={() => goTo(`${Routes.CLIENT_STOREFRONT}/${product?.facility.id}`)}
                style={{ fontSize: '24px', color: colors.red }}
              >
                Show All
              </ButtonUi>
            )}
          </Box>
          <Box mt={5} mb={isMobile ? 15 : 2}>
            <ClientProductsCards products={productsByFacilites} loading={loading} />
          </Box>
          {isMobile && (
            <ButtonUi
              var={EButtonType.Text}
              onClick={() => goTo(`${Routes.CLIENT_STOREFRONT}/${product?.facility.id}`)}
              style={{ fontSize: '24px', color: colors.red }}
            >
              Show All
            </ButtonUi>
          )}
        </Box>
      </Box>
    </>
  );

  function getProductIds(data: ICartModel[]): number[] {
    const ids: number[] = [];

    data.forEach((cart) => {
      cart.cartItems.forEach((item) => {
        if (item.product && item.product.id) {
          ids.push(item.product.id);
        }
      });
    });

    return ids;
  }
};

export default Product;
