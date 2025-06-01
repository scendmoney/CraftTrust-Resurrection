import { FC, useState } from 'react';
import { Box, Menu, Typography, useMediaQuery, useTheme } from '@mui/material';
import { IProductModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import PdfIcon from 'resources/iconsMui/PdfIcon';

import LabTestList from '../LabTestList/LabTestList';
import { downloadHandler } from '../utils/downloadHandler';

import styles from './styles';

const LabTestDownLoadLarge: FC<{
  product: IProductModel;
}> = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        <Box sx={styles.download} onClick={handleDownload}>
          {!isMobile && (
            <Typography variant="body1" fontWeight={500} style={{ color: colors.green }}>
              Download Report
            </Typography>
          )}
          <PdfIcon fill={colors.green} />
        </Box>
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
          <Box
            sx={styles.download}
            onClick={handleOpen}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Typography variant="body1" fontWeight={500} style={{ color: colors.green }}>
              Download Report
            </Typography>
            <PdfIcon fill={colors.green} />
          </Box>
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

export default LabTestDownLoadLarge;
