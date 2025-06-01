import { ComponentType, memo } from 'react';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { CompanyStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const RewardsFormatter:
  | ComponentType<{
      quantity: number;
      quantitySold: number;
      status: CompanyStatusEnum;
    }>
  | undefined = ({ quantity, quantitySold, status }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="body1" fontWeight={500}>
        {quantity}
      </Typography>
      {quantity === quantitySold &&
      status === CompanyStatusEnum.Active &&
      quantity !== 0 &&
      quantitySold !== 0 ? (
        <Tooltip
          title={
            <Typography variant="caption" textAlign={'center'}>
              Sold out!
            </Typography>
          }
          placement={'bottom'}
        >
          <ReportGmailerrorredOutlinedIcon htmlColor={colors.secondary} />
        </Tooltip>
      ) : null}
    </Box>
  );
};

export default memo(RewardsFormatter);
