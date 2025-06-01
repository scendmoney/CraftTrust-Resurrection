import { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from '@apollo/client';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton, Slide, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IProductModel, IProductsModel, IQueryProductsBuyerArgs } from 'graphql/_server';
import PRODUCTS_BUYER from 'graphql/queries/productsBuyer';
import { colors } from 'mui/theme/colors';
import useScrollPositionDebounced from 'sharedArchitech/hooks/useScrollPositionDebounced/useScrollPositionDebounced';
import productFiltersMap from 'sharedProject/components/filters/utils/productFiltersMap';

import Loader from 'components/Loader/Loader';

import ClientProductsCards from './ClientProductsCards/ClientProductsCards';
import ClientProductsFilters from './ClientProductsFilters/ClientProductsFilters';
import ClientProductsSorting from './ClientProductsSorting/ClientProductsSorting';
import styles from './styles';
import useProductsFilters from './useProductsFilters';
import useProductsSorts from './useProductsSorts';
const take = 8;

const ClientProducts: FC<{ facilityId?: string | undefined; showCultivatorFilters?: boolean }> = ({
  facilityId = undefined,
  showCultivatorFilters = false
}) => {
  const [products, setProducts] = useState<IProductModel[]>([]);
  const { sortsOptions, sorts, direction, changeDirection } = useProductsSorts(setProducts);
  const [skip, setSkip] = useState<number>(0);
  const [isHasMore, setIsHasMore] = useState<boolean>(true);
  const scrolled = useScrollPositionDebounced(500);
  const isShowBadgeUm = useMemo(() => {
    let innerHeight = 0;
    if (typeof window !== 'undefined') {
      innerHeight = window.innerHeight;
    }
    return scrolled > innerHeight;
  }, [scrolled]);

  const { filters, addFilter, removeFilter } = useProductsFilters(setProducts, facilityId);

  const { loading } = useQuery<{ productsBuyer: IProductsModel }, IQueryProductsBuyerArgs>(
    PRODUCTS_BUYER,
    {
      variables: {
        payload: {
          filters: [...productFiltersMap(filters)],
          sorts: sorts,
          paginate: {
            take,
            skip
          }
        }
      },
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const items: IProductModel[] = data?.productsBuyer.items || [];

        const total = data?.productsBuyer?.meta?.total || 0;

        setProducts([...products, ...items]);
        setIsHasMore(total > skip + take);
      }
    }
  );

  useEffect(() => {
    setSkip(0);
  }, [filters, sorts]);

  return (
    <>
      {loading && <Loader />}
      <Box sx={{ minHeight: '100vh' }}>
        <Box sx={styles.headerLine}>
          <ClientProductsFilters
            filters={filters}
            removeFilter={removeFilter}
            addFilter={addFilter}
            showCultivatorFilters={showCultivatorFilters}
          />
          <ClientProductsSorting
            sortsOptions={sortsOptions}
            direction={direction}
            changeDirection={changeDirection}
          />
        </Box>
        {!products.length && !loading ? (
          <Box sx={styles.notFound}>
            <Typography variant="h4">No available products</Typography>
          </Box>
        ) : (
          <>
            <InfiniteScroll
              dataLength={products.length}
              next={loadMore}
              hasMore={isHasMore}
              loader={null}
              pullDownToRefreshThreshold={100}
            >
              <ClientProductsCards products={products} loading={loading} />
            </InfiniteScroll>
            <Slide direction="left" in={isShowBadgeUm} timeout={1000}>
              <IconButton sx={styles.badge} onClick={() => handleGoToTop()}>
                <ArrowUpwardIcon htmlColor={colors.white} />
              </IconButton>
            </Slide>
          </>
        )}
      </Box>
    </>
  );

  function loadMore() {
    if (loading) return;
    setSkip(skip + take);
  }

  function handleGoToTop() {
    if (window) {
      window.scrollTo(0, 0);
    }
  }
};

export default ClientProducts;
