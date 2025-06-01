import { FC } from 'react';
import { Typography } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { IProductModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import PdfIcon from 'resources/iconsMui/PdfIcon';

import { downloadHandler } from '../utils/downloadHandler';

const LabTestList: FC<{
  product: IProductModel;
}> = ({ product }) => {
  return (
    <>
      <MenuList sx={{ width: 200, maxWidth: '100%' }}>
        {product.labTestDocuments?.map((item, index) => (
          <MenuItem key={item} onClick={() => handleDownload(item)}>
            <ListItemIcon>
              <PdfIcon fill={colors.secondary} />
            </ListItemIcon>
            <Typography variant="body1" fontWeight={500}>
              Labtest #{index + 1}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </>
  );

  function handleDownload(item: string) {
    downloadHandler(product.facility.license.licenseNumber, product.id, item);
  }
};

export default LabTestList;
