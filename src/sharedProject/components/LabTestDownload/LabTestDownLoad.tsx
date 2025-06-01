import { FC } from 'react';
import { IProductModel } from 'graphql/_server';

import LabTestDownLoadLarge from './LabTestDownloadLarge/LabTestDownloadLarge';
import LabTestDownLoadSmall from './LabTestDownloadSmall/LabTestDownloadSmall';

const LabTestDownLoad: FC<{ product: IProductModel; isLargeView?: boolean }> = ({
  product,
  isLargeView
}) => {
  return (
    <>
      {isLargeView ? (
        <LabTestDownLoadLarge product={product} />
      ) : (
        <LabTestDownLoadSmall product={product} />
      )}
    </>
  );
};

export default LabTestDownLoad;
