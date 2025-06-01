import { FC, useState } from 'react';
import { IconButton, Menu } from '@mui/material';
import { IProductModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import PdfIcon from 'resources/iconsMui/PdfIcon';

import LabTestList from '../LabTestList/LabTestList';
import { downloadHandler } from '../utils/downloadHandler';

import styles from './styles';

const LabTestDownLoadSmall: FC<{
  product: IProductModel;
}> = ({ product }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {product.labTestDocuments?.length === 1 ? (
        <IconButton sx={styles.pdfWrapper} onClick={handleDownload}>
          <PdfIcon fill={colors.secondary} />
        </IconButton>
      ) : (
        <>
          <Menu
            id="basic-button"
            anchorEl={anchorEl}
            onClose={handleClose}
            open={open}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <LabTestList product={product} />
          </Menu>
          <IconButton
            size="small"
            sx={styles.pdfWrapper}
            onClick={handleOpen}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <PdfIcon fill={colors.secondary} />
          </IconButton>
        </>
      )}
    </>
  );

  function handleDownload() {
    if (product.labTestDocuments) {
      downloadHandler(
        product.facility.license.licenseNumber,
        product.id,
        product.labTestDocuments[0]
      );
    }
  }
};

export default LabTestDownLoadSmall;
