import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Divider, Fade, Grid, IconButton, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IQueryTransactionByIdAdminArgs, ITransactionModel } from 'graphql/_server';
import TRANSACTION_BY_ID_ADMIN from 'graphql/queries/transactionByIdAdmin';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { mappingTransactionTypes } from 'sharedProject/utils/mappingTransactionTypes';

import OrderItem from 'components/Cultivator/CultivatorOrders/CultivatorOrder/OrderItems/OrderItem/OrderItem';
import Loader from 'components/Loader/Loader';

import BlockchainTable from './BlockchainTable/BlockchainTable';
import DetailsInfo from './DetailsInfo/DetailsInfo';
import styles from './styles';

const AdminTransactionDetails: FC = () => {
  const router = useRouter();
  const { clearQuery, goToModal } = useProjectRouter();
  const [transaction, setTransaction] = useState<ITransactionModel>();
  const transactionId = nextRouterQueryCheckId(router.query.id);

  const [tab, setTab] = useState<string>('Transaction Details');
  const { loading } = useQuery<
    { transactionByIdAdmin: ITransactionModel },
    IQueryTransactionByIdAdminArgs
  >(TRANSACTION_BY_ID_ADMIN, {
    variables: {
      payload: {
        id: transactionId
      }
    },
    onCompleted: (data) => {
      const item = data.transactionByIdAdmin;
      setTransaction(item);
    },
    skip: Boolean(!transactionId),
    fetchPolicy: 'network-only'
  });

  if (!transaction) {
    return null;
  }

  return (
    <>
      {loading && <Loader />}
      <Fade in={!loading} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <DetailsInfo data={transaction} />

          <Box sx={styles.form}>
            <Box>
              <HeaderTabs
                tabs={
                  transaction.blockchainTransactions.length
                    ? ['Transaction Details', 'Blockchain']
                    : ['Transaction Details']
                }
                tab={tab}
                setTab={setTab}
              />

              {tab === 'Transaction Details' && (
                <Box>
                  <Grid container spacing={2} mt={2}>
                    {transaction.facilityFrom ? (
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel sx={styles.label}>From</InputLabel>
                        <Box sx={styles.assigneeWrapper}>
                          <AvatarUncontrolled
                            src={transaction.facilityFrom?.asset?.url || undefined}
                            type={24}
                          />
                          <Typography variant="subtitle1" fontWeight={500}>
                            {transaction.facilityFrom?.displayName}
                          </Typography>
                        </Box>
                      </Grid>
                    ) : null}
                    {transaction.facilityTo ? (
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel sx={styles.label}>To</InputLabel>
                        <Box sx={styles.assigneeWrapper}>
                          <AvatarUncontrolled
                            src={transaction.facilityTo?.asset?.url || undefined}
                            type={24}
                          />
                          <Typography variant="subtitle1" fontWeight={500}>
                            {transaction.facilityTo?.displayName}
                          </Typography>
                        </Box>
                      </Grid>
                    ) : null}
                  </Grid>
                  <Grid container spacing={2} mb={4} mt={2}>
                    <Grid item lg={12} md={6} sm={12} xs={12}>
                      <InputText
                        titleText="Type"
                        value={mappingTransactionTypes(transaction.type)}
                        readOnly
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <InputText
                        titleText="Amount"
                        value={`${transaction.amount} CARAT`}
                        readOnly
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <InputText
                        titleText="Amount USD"
                        value={`$${transaction.amountUsd}`}
                        readOnly
                      />
                    </Grid>
                    {transaction.error ? (
                      <Grid item lg={12} md={6} sm={12} xs={12}>
                        <InputText
                          titleText="Error"
                          value={transaction.error}
                          readOnly
                          multiline
                          maxRows={3}
                        />
                      </Grid>
                    ) : null}
                  </Grid>
                  {transaction.order ? (
                    <>
                      <Box mb={3}>
                        <Divider light />
                      </Box>
                      <Box mt={4} mb={2} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          Order #{transaction?.order?.id}
                        </Typography>
                        <IconButton
                          onClick={() => goToModal({ id: transaction?.order?.id }, 'orders')}
                        >
                          <ArrowForwardIcon />
                        </IconButton>
                      </Box>
                      <Box sx={styles.items}>
                        {transaction.order?.products?.map((item) => {
                          return <OrderItem key={item.id} item={item} />;
                        })}
                      </Box>
                    </>
                  ) : null}
                </Box>
              )}

              {tab === 'Blockchain' && (
                <BlockchainTable data={transaction.blockchainTransactions} />
              )}
            </Box>
            <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default AdminTransactionDetails;
