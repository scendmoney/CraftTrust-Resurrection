import { FC, useMemo } from 'react';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProductModel, LabTestingEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import HarvestIcon from 'resources/iconsMui/HarvestIcon';
import ResearchIcon from 'resources/iconsMui/ResearchIcon';
import LabTestDownLoad from 'sharedProject/components/LabTestDownload/LabTestDownLoad';

import ProductInfoLeftItem from './ProductInfoLeftItem/ProductInfoLeftItem';
import styles from './styles';

const ProductInfo: FC<{ product: IProductModel }> = ({ product }) => {
  const labTextUm = useMemo(() => {
    return product.labTestingState === LabTestingEnum.TestPassed ? (
      <Box sx={styles.labWrapper}>
        <ProductInfoLeftItem
          label={'Lab Tested'}
          title={product?.labTestingStateDate}
          icon={<ResearchIcon fill={colors.black1} stroke={colors.white} />}
        />
        {product.labTestDocuments?.length ? <LabTestDownLoad product={product} /> : null}
      </Box>
    ) : null;
  }, [product]);
  return (
    <>
      <Typography variant="h3">{product?.item.name}</Typography>
      <Typography variant="body1" fontWeight={500} color="secondary">
        {product?.item.productCategoryName}
      </Typography>
      <Divider />
      <ProductInfoLeftItem
        label={'Harvest Date'}
        title={product?.packagedDate}
        icon={<HarvestIcon />}
      />
      {labTextUm}
    </>
  );
};

export default ProductInfo;
