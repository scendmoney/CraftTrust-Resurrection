import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IProductModel,
  IProductsModel,
  IQueryProductsCultivatorArgs
} from 'graphql/_server';
import PRODUCTS_CULTIVATOR from 'graphql/queries/productsCultivator';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import productFiltersMap from 'sharedProject/components/filters/utils/productFiltersMap';

import ClientProductsCards from 'components/Client/ClientProducts/ClientProductsCards/ClientProductsCards';
import ClientProductsFilters from 'components/Client/ClientProducts/ClientProductsFilters/ClientProductsFilters';
import ClientProductsSorting from 'components/Client/ClientProducts/ClientProductsSorting/ClientProductsSorting';
import useProductsSorts from 'components/Client/ClientProducts/useProductsSorts';
import Loader from 'components/Loader/Loader';

import styles from './styles';
import useProductsFilters from './useProductsFilters';

const take = 12;

const CultivatorStorefrontProducts: FC<{
  facilityId?: string | undefined;
  setProductId?: Dispatch<SetStateAction<number | undefined>>;
}> = ({ facilityId, setProductId }) => {
  const [products, setProducts] = useState<IProductModel[]>([]);
  const { sortsOptions, sorts, direction, changeDirection } = useProductsSorts(setProducts);
  const [skip, setSkip] = useState<number>(0);
  const [isHasMore, setIsHasMore] = useState<boolean>(true);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);

  const { filters, addFilter, removeFilter } = useProductsFilters(setProducts, facilityId);

  const { loading, fetchMore } = useQuery<
    { productsCultivator: IProductsModel },
    IQueryProductsCultivatorArgs
  >(PRODUCTS_CULTIVATOR, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'quantityStock',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Number,
            value: ['0']
          },
          ...productFiltersMap(filters)
        ],
        sorts: sorts,
        paginate: {
          take,
          skip
        }
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const items: IProductModel[] = data?.productsCultivator.items || [];
      const total = data?.productsCultivator?.meta?.total || 0;

      setProducts([...products, ...items]);
      setIsHasMore(total > skip + take);
    }
  });

  const handleShowMore = () => {
    if (!isHasMore) {
      setIsButtonActive(false);
      return;
    }
    fetchMore({
      variables: {
        payload: {
          filters: productFiltersMap(filters),
          sorts: sorts,
          paginate: {
            take,
            skip: skip + take
          }
        }
      }
    });
    setSkip(skip + take);
  };

  useEffect(() => {
    setSkip(0);
  }, [filters, sorts]);

  useEffect(() => {
    setIsButtonActive(isHasMore);
  }, [isHasMore]);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.headerLine}>
        <ClientProductsFilters
          filters={filters}
          removeFilter={removeFilter}
          addFilter={addFilter}
        />
        <ClientProductsSorting
          sortsOptions={sortsOptions}
          direction={direction}
          changeDirection={changeDirection}
        />
      </Box>
      {loading && skip !== take ? (
        <Loader />
      ) : (
        <>
          {!products.length && !loading ? (
            <Box sx={styles.notFound}>
              <Typography variant="h4">No available products</Typography>
            </Box>
          ) : (
            <>
              <ClientProductsCards
                products={products}
                setProductId={setProductId}
                loading={loading}
              />
              {isButtonActive && <ButtonUi onClick={handleShowMore}>Show More</ButtonUi>}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CultivatorStorefrontProducts;
