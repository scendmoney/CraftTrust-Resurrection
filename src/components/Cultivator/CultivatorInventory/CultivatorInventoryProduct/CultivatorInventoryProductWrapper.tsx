import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { IProductModel, IQueryProductByIdCultivatorArgs } from 'graphql/_server';
import PRODUCT_BY_ID_CULTIVATOR from 'graphql/queries/productByIdCultivator';
import { useRouter } from 'next/router';
import useIsInitialLoaded from 'sharedArchitech/hooks/useIsInitialLoaded/useIsInitialLoaded';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';

import Loader from 'components/Loader/Loader';

import CultivatorInventoryProduct from './CultivatorInventoryProduct';

const CultivatorInventoryProductWrapper: FC = () => {
  const router = useRouter();
  const productId = nextRouterQueryCheckId(router.query.id);
  const { isInitialLoaded, setIsInitialLoaded } = useIsInitialLoaded();
  const { data } = useQuery<
    { productByIdCultivator: IProductModel },
    IQueryProductByIdCultivatorArgs
  >(PRODUCT_BY_ID_CULTIVATOR, {
    variables: {
      payload: {
        id: productId
      }
    },
    onCompleted: () => {
      setIsInitialLoaded();
    },
    onError: () => {
      setIsInitialLoaded();
    },
    fetchPolicy: 'network-only'
  });

  if (!isInitialLoaded) {
    return <Loader />;
  }

  if (!data?.productByIdCultivator) {
    return null;
  }

  return (
    <>
      <CultivatorInventoryProduct product={data.productByIdCultivator} />
    </>
  );
};

export default CultivatorInventoryProductWrapper;
