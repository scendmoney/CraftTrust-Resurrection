import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { IFacilityModel, IProductModel, IQueryProductByIdCultivatorArgs } from 'graphql/_server';
import FACILITY_BY_ID from 'graphql/queries/facilityById';
import PRODUCT_BY_ID_CULTIVATOR from 'graphql/queries/productByIdCultivator';
import FacilityHeaderInfo from 'sharedProject/components/FacilityHeaderInfo/FacilityHeaderInfo';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import useMe from 'sharedProject/hooks/useMe';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import CultivatorStorefrontProduct from './CultivatorStorefrontProduct/CultivatorStorefrontProduct';
import CultivatorStorefrontProducts from './CultivatorStorefrontProducts/CultivatorStorefrontProducts';
import styles from './styles';

const CultivatorStorefront: FC<{ facilityId?: string | undefined }> = ({
  facilityId = undefined
}) => {
  const { dataMe, loadingMe } = useMe();
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const { clearQuery } = useProjectRouter();
  const [product, setProduct] = useState<IProductModel>();
  const { loading: loadingProduct } = useQuery<
    { productByIdCultivator: IProductModel },
    IQueryProductByIdCultivatorArgs
  >(PRODUCT_BY_ID_CULTIVATOR, {
    variables: {
      payload: {
        id: productId
      }
    },
    onCompleted: (data) => {
      const item = data.productByIdCultivator;
      setProduct(item);
    },
    skip: !productId,
    fetchPolicy: 'no-cache'
  });

  const { data: facilityByIdData, loading } = useQuery<{ facilityById: IFacilityModel }>(
    FACILITY_BY_ID,
    {
      variables: {
        payload: {
          id: dataMe?.context?.id
        }
      },
      skip: Boolean(!dataMe?.context?.id)
    }
  );

  if (!dataMe?.context) {
    return null;
  }
  if (loadingMe || loading) {
    return <Loader />;
  }
  return productId ? (
    <Box sx={styles.productWrapper}>
      <ModalCloseButtonUi zIndex={1000} onClose={() => setProductId(undefined)} />
      {product && <CultivatorStorefrontProduct product={product} loading={loadingProduct} />}
    </Box>
  ) : (
    <Box sx={styles.storeWrapper}>
      {facilityByIdData && (
        <FacilityHeaderInfo facilityById={facilityByIdData.facilityById} hideChatButton />
      )}

      <CultivatorStorefrontProducts
        facilityId={facilityId || dataMe?.context.id}
        setProductId={setProductId}
      />
      <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
    </Box>
  );
};

export default CultivatorStorefront;
