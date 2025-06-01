import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IOrderProductModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import styles from './styles';

const OrderItem: FC<{ item: IOrderProductModel }> = ({ item }) => {
  return (
    <Box sx={styles.container}>
      <AvatarUncontrolled
        variant="rounded"
        isGrayBackground
        src={item.parentProduct?.thumbnail?.url}
      />

      <Box flexGrow={1} gap={0.15} display="flex" flexDirection="column">
        <Typography fontWeight={500} variant="subtitle1">
          {item.parentProduct?.item?.name}
        </Typography>
        <Typography color={colors.gray5} variant="body1">
          Harvest: {formatDateTimeDateFns(item.parentProduct?.packagedDate)}
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography variant="subtitle1" fontWeight={500}>
          <DollarAmountFormatter value={item?.total} />
        </Typography>
        <Typography variant="body1" color={colors.gray5}>
          {item?.quantity} lb
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderItem;
