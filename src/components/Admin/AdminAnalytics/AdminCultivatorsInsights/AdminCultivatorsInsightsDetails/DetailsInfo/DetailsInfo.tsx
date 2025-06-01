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
            Revenue
          </Typography>
          <DollarAmountFormatter value={Number(data?.totalRevenue)} />
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            QTY Sold
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {`${data?.quantityProductRevenue} lb`}
          </Typography>
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Avg. Transaction
          </Typography>
          <DollarAmountFormatter value={Number(data?.avgPriceCultivator)} />
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Avg. Price/Pound
          </Typography>
          <DollarAmountFormatter value={Number(data?.avgPricePoundCultivator)} />
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Avg. Pounds/Order
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {`${data?.avgPoundsOrderCultivator} lb`}
          </Typography>
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Total listed
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {`${data?.totalListed} lb`}
          </Typography>
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Total metrc
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {`${data?.totalMetrc} lb`}
          </Typography>
        </Box>
        <Divider />
        <Box sx={styles.item}>
          <Typography variant="body1" color={colors.black1}>
            Listed %
          </Typography>
          <Typography variant="body1" color={colors.black1}>
            {`${data?.percentListed} %`}
          </Typography>
        </Box>
        <Divider />
      </Box>
    </Box>
  );
};

export default DetailsInfo;
