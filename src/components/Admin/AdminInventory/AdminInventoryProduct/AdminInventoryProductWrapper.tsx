import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { IProductModel, IQueryProductByIdAdminArgs } from 'graphql/_server';
import PRODUCT_BY_ID_ADMIN from 'graphql/queries/productByIdAdmin';
import { useRouter } from 'next/router';
import useIsInitialLoaded from 'sharedArchitech/hooks/useIsInitialLoaded/useIsInitialLoaded';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';

import Loader from 'components/Loader/Loader';

import AdminInventoryProduct from './AdminInventoryProduct';

const AdminInventoryProductWrapper: FC = () => {
  const router = useRouter();
  const productId = nextRouterQueryCheckId(router.query.id);
  const { isInitialLoaded, setIsInitialLoaded } = useIsInitialLoaded();
  const { data } = useQuery<{ productByIdAdmin: IProductModel }, IQueryProductByIdAdminArgs>(
    PRODUCT_BY_ID_ADMIN,
    {
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
    }
  );

  if (!isInitialLoaded) {
    return <Loader />;
  }

  if (!data?.productByIdAdmin) {
    return null;
  }

  return (
    <>
      <AdminInventoryProduct product={data.productByIdAdmin} />
    </>
  );
};

export default AdminInventoryProductWrapper;
