import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITransactionModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import TransactionIcon from 'resources/iconsMui/TransactionIcon';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import { mappingTransactionStatus } from 'sharedProject/utils/mappingTransactionStatus';

import styles from './styles';

const DetailsInfo: FC<{
  data: ITransactionModel | undefined;
}> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        <Box sx={styles.statusBlock}>
          <Box sx={styles.id}>
            <Typography variant="h4"># {data?.id}</Typography>
            <TransactionIcon htmlColor={colors.secondary} />
          </Box>
          <Box sx={styles.status}>
            <Typography variant="body1">{mappingTransactionStatus(data.status)}</Typography>
          </Box>
        </Box>

        <Box sx={styles.assignee}>
          <Typography variant="body2" color={colors.gray2}>
            Created
          </Typography>
          <Typography variant="body1">
            {formatDateTimeDateFns(data.dates.createdDate, true)}
          </Typography>
        </Box>
        <Box sx={styles.assignee}>
          <Typography variant="body2" color={colors.gray2}>
            Updated
          </Typography>
          <Typography variant="body1">
            {formatDateTimeDateFns(data.dates.updatedDate, true)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsInfo;
