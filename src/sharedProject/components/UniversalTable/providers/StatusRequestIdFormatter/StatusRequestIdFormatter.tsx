import { ComponentType, memo, useMemo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { RequestStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import CompletedIcon from 'resources/iconsMui/orderStatuses/CompletedIcon';
import ConfirmedIcon from 'resources/iconsMui/orderStatuses/ConfirmedIcon';
import NewOrderIcon from 'resources/iconsMui/orderStatuses/NewOrderIcon';
import WaitingIcon from 'resources/iconsMui/orderStatuses/WaitingIcon';

import styles from './styles';

const StatusRequestIdFormatter:
  | ComponentType<{
      status: RequestStatusEnum;
      id: string | undefined | null;
      isMessages?: boolean;
    }>
  | undefined = ({ status, id, isMessages }) => {
  const iconUm = useMemo(() => {
    if (status === RequestStatusEnum.New) {
      return isMessages ? (
        <ChatIcon fill={colors.secondary} />
      ) : (
        <NewOrderIcon htmlColor={colors.green} />
      );
    }
    if (status === RequestStatusEnum.Processing) {
      return <WaitingIcon htmlColor={colors.orange} />;
    }
    if (status === RequestStatusEnum.Closed) {
      return <CompletedIcon htmlColor={colors.green} />;
    }
    if (status === RequestStatusEnum.Approved) {
      return <CompletedIcon htmlColor={colors.green} />;
    }
    if (status === RequestStatusEnum.Rejected) {
      return <ConfirmedIcon htmlColor={colors.secondary} />;
    }
    return <NewOrderIcon htmlColor={colors.gray5} />;
  }, [isMessages, status]);
  return (
    <Box sx={styles.container}>
      {iconUm}
      <Typography variant="body1" fontWeight={500}>
        {id || '--'}
      </Typography>
    </Box>
  );
};

export default memo(StatusRequestIdFormatter);
