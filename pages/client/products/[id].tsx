import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';

import Product from 'components/Product/Product';

const ProductPage: NextPage = () => {
  const router = useRouter();
  const productId = nextRouterQueryCheckId(router?.query?.id);

  if (!productId) {
    return <ErrorPage text={'Wrong id'} />;
  }

  return (
    <div>
      <Product productId={productId} />
    </div>
  );
};

export default ProductPage;
