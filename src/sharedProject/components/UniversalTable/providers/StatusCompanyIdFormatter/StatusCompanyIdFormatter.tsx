import { ComponentType, memo, useMemo } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReportIcon from '@mui/icons-material/Report';
import { Badge, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { CompanyStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ArchivedIcon from 'resources/iconsMui/ArchivedIcon';
import DraftIcon from 'resources/iconsMui/DraftIcon';
import CompletedIcon from 'resources/iconsMui/orderStatuses/CompletedIcon';

import styles from './styles';

const StatusCompanyIdFormatter:
  | ComponentType<{
      status: CompanyStatusEnum;
      id: string | undefined | null;
      newRequest?: boolean;
    }>
  | undefined = ({ status, id, newRequest = false }) => {
  const iconUm = useMemo(() => {
    if (status === CompanyStatusEnum.Active) {
      return <PlayCircleIcon htmlColor={colors.green} />;
    }
    if (status === CompanyStatusEnum.Pending) {
      return <AccessTimeIcon htmlColor={colors.orange} />;
    }
    if (status === CompanyStatusEnum.Archived) {
      return <ArchivedIcon htmlColor={colors.gray5} />;
    }
    if (status === CompanyStatusEnum.Completed) {
      return <CompletedIcon htmlColor={colors.gray5} />;
    }
    if (status === CompanyStatusEnum.Draft) {
      return <DraftIcon htmlColor={colors.green} />;
    }
    if (status === CompanyStatusEnum.Rejected) {
      return <ReportIcon htmlColor={colors.secondary} />;
    }

    return <DraftIcon htmlColor={colors.green} />;
  }, [status]);
  return (
    <Box sx={styles.container}>
      {iconUm}
      <Badge
        invisible={!newRequest}
        sx={styles.badge}
        variant="dot"
        color="secondary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Typography variant="body1" fontWeight={500}>
          {id || '--'}
        </Typography>
      </Badge>
    </Box>
  );
};

export default memo(StatusCompanyIdFormatter);
