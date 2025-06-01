import { FC, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Fade, Skeleton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import { IFacilityBalanceDto } from 'graphql/_server';
import { FACILITY_BALANCE_CARAT } from 'graphql/queries/facilityBalance';
import { useRouter } from 'next/router';
import Routes from 'routes';
import { TVoidFun } from 'sharedArchitech/types';

import Loader from 'components/Loader/Loader';
import LoaderInline from 'components/LoaderInline/LoaderInline';

import CaratAmountFormatter from '../CaratAmountFormatter/CaratAmountFormatter';
// import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import DollarAmountFormatter from '../DollarAmountFormatter/DollarAmountFormatter';

import styles from './styles';

const MenuBalances: FC<{ close?: TVoidFun }> = ({ close }) => {
  // const { goToModal, query } = useProjectRouter();
  const { data, loading } = useQuery<{ facilityBalanceCarat: IFacilityBalanceDto }>(
    FACILITY_BALANCE_CARAT
  );
  const router = useRouter();
  const newData = data?.facilityBalanceCarat;

  const stateUm = useMemo(() => {
    return {
      carats: newData?.balanceBuy.balance,
      usd: newData?.balanceBuy.balanceUsd,
      pendingCarats: newData?.balanceBlocked.balance,
      pendingUsd: newData?.balanceBlocked.balanceUsd
    };
  }, [newData]);

  if (loading) {
    return (
      <Box sx={styles.container}>
        <Skeleton />
        <Skeleton sx={{ width: '80%' }} />
        <Skeleton sx={{ width: '80%' }} />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.block}>
        <Typography variant="body1" fontWeight={600}>
          Balance
        </Typography>

        <Box sx={styles.price}>
          <Box component="img" width={16} height={16} src="/resources/carat.png" />
          <Typography fontWeight={600}>
            <CaratAmountFormatter showCurrency={false} value={stateUm.carats || 0} />
          </Typography>

          <Typography fontWeight={600} color="#777">
            (<DollarAmountFormatter value={stateUm.usd || 0} />)
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.pending}>
        {stateUm.pendingCarats ? (
          <Typography variant="body2" color="#777">
            <b>
              <CaratAmountFormatter value={stateUm.pendingCarats || 0} /> (
              <DollarAmountFormatter value={stateUm.usd || 0} />)
            </b>
            &nbsp;sent to your bank account.
          </Typography>
        ) : (
          <Typography variant="body2" color="#777">
            All funds will be automatically transferred to your bank account.
          </Typography>
        )}
        {router.pathname !== Routes.CULTIVATOR_TRANSACTIONS ? (
          <IconButton
            size="small"
            sx={styles.arrow}
            onClick={() => {
              close && close();
              router.push(Routes.CULTIVATOR_TRANSACTIONS);
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );

  // function handleRoute(modalId: string) {
  //   if (close) {
  //     close();
  //   }
  //   goToModal(
  //     query?.id
  //       ? {
  //           modalId: modalId,
  //           id: query?.id
  //         }
  //       : {
  //           modalId: modalId
  //         }
  //   );
  // }
};

export default MenuBalances;
