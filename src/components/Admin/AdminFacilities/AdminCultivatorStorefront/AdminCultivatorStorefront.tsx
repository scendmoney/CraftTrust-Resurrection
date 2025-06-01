import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { IFacilityModel, IProductModel, IQueryProductByIdCultivatorArgs } from 'graphql/_server';
import { FACILITY_BY_ID_ADMIN } from 'graphql/queries/facilityByIdAdmin';
import PRODUCT_BY_ID_ADMIN from 'graphql/queries/productByIdAdmin';
import FacilityHeaderInfo from 'sharedProject/components/FacilityHeaderInfo/FacilityHeaderInfo';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';

import Loader from 'components/Loader/Loader';

import AdminCultivatorStorefrontProduct from './AdminCultivatorStorefrontProduct/AdminCultivatorStorefrontProduct';
import AdminCultivatorStorefrontProducts from './AdminCultivatorStorefrontProducts/AdminCultivatorStorefrontProducts';
import styles from './styles';

const AdminCultivatorStorefront: FC<{ facilityId?: string | undefined; onClose: () => void }> = ({
  facilityId = undefined,
  onClose
}) => {
  const [productId, setProductId] = useState<number | undefined>(undefined);

  const [product, setProduct] = useState<IProductModel>();

  const { loading: loadingProduct } = useQuery<
    { productByIdAdmin: IProductModel },
    IQueryProductByIdCultivatorArgs
  >(PRODUCT_BY_ID_ADMIN, {
    variables: {
      payload: {
        id: productId
      }
    },
    onCompleted: (data) => {
      const item = data.productByIdAdmin;
      setProduct(item);
    },
    skip: !productId,
    fetchPolicy: 'no-cache'
  });

  const { data: facilityByIdData, loading } = useQuery<{ facilityByIdAdmin: IFacilityModel }>(
    FACILITY_BY_ID_ADMIN,
    {
      variables: {
        payload: {
          id: facilityId
        }
      },
      skip: Boolean(!facilityId)
    }
  );

  if (loading) {
    return <Loader />;
  }

  if (!facilityId) {
    return null;
  }

  return productId ? (
    <Box sx={styles.productWrapper}>
      <ModalCloseButtonUi zIndex={1000} onClose={() => setProductId(undefined)} />
      {product && <AdminCultivatorStorefrontProduct product={product} loading={loadingProduct} />}
    </Box>
  ) : (
    <Box sx={styles.storeWrapper}>
      {facilityByIdData && (
        <FacilityHeaderInfo facilityById={facilityByIdData?.facilityByIdAdmin} hideChatButton />
      )}

      <AdminCultivatorStorefrontProducts facilityId={facilityId} setProductId={setProductId} />
      <ModalCloseButtonUi zIndex={1000} onClose={onClose} />
    </Box>
  );
};

export default AdminCultivatorStorefront;
