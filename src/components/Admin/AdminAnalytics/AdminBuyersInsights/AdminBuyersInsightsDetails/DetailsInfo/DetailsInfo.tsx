import { FC } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IReportSalesPerformanceDto } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import { mappingFacilitiesRole } from 'sharedProject/utils/mappingFacilityRole';

import styles from './styles';

const DetailsInfo: FC<{
  data: IReportSalesPerformanceDto | undefined;
}> = ({ data }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        <Box>
          <AvatarUncontrolled src={data?.facility?.asset?.url} type={192} />
        </Box>
        <Box mb={2}>
          <Typography variant="h4" fontWeight={500} mb={2}>
            {data?.facility?.displayName}
          </Typography>
          <Typography variant="body1" fontWeight={500} color={colors.secondary}>
            {mappingFacilitiesRole(data?.facility?.role)}
          </Typography>
        </Box>

        <Divider />

        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Spent
          </Typography>
          <DollarAmountFormatter value={Number(data?.totalPurchased)} />
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            QTY Purchased
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {`${data?.quantityProductPurchased} lb`}
          </Typography>
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Purchases
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {data?.purchases}
          </Typography>
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Avg. Transaction
          </Typography>
          <DollarAmountFormatter value={Number(data?.avgPriceBuyer)} />
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Avg. Price/Pound
          </Typography>
          <DollarAmountFormatter value={Number(data?.avgPricePoundBuyer)} />
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Avg. Pounds/Order
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {`${data?.avgPoundsOrderBuyer} lb`}
          </Typography>
        </Box>
        <Divider />
      </Box>
    </Box>
  );
};

export default DetailsInfo;
