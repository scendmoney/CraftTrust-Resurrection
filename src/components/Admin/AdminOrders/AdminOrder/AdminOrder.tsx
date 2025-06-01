import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Divider, Fade, Typography } from '@mui/material';
import { IOrderModel, IQueryOrderByIdAdminArgs } from 'graphql/_server';
import ORDER_BY_ID_ADMIN from 'graphql/queries/orderByIdAdmin';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import OrderInfo from './OrderInfo/OrderInfo';
import OrderItems from './OrderItems/OrderItems';
import OrderPaymentStatus from './OrderPaymentStatus/OrderPaymentStatus';
import OrderPickBy from './OrderPickBy/OrderPickBy';
import styles from './styles';

const AdminOrder: FC = () => {
  const router = useRouter();
  const { clearQuery } = useProjectRouter();
  const orderId = nextRouterQueryCheckId(router.query.id);
  const [orderById, setOrderById] = useState<IOrderModel | undefined>(undefined);

  const { loading } = useQuery<{ orderByIdAdmin: IOrderModel }, IQueryOrderByIdAdminArgs>(
    ORDER_BY_ID_ADMIN,
    {
      variables: {
        payload: {
          id: orderId
        }
      },
      onCompleted: (data) => {
        const item = data.orderByIdAdmin;
        setOrderById(item);
      },
      skip: Boolean(!orderId)
    }
  );

  const [tab, setTab] = useState<string>('Order Details');

  if (loading) {
    return <Loader />;
  }

  if (!orderById) {
    return null;
  }

  return (
    <>
      {loading && <Loader />}

      <Fade in timeout={1000}>
        <Box sx={styles.container}>
          <OrderInfo order={orderById} />
          <Box sx={styles.form}>
            <>
              <HeaderTabs tabs={['Order Details']} tab={tab} setTab={setTab} />

              <OrderPaymentStatus order={orderById} />

              <OrderItems order={orderById} />

              <Box mt={4} mb={4}>
                <Divider light />
              </Box>

              <Box sx={styles.totalWrapper}>
                <Box sx={styles.total}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                    Products
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                    <DollarAmountFormatter value={orderById?.total} />
                  </Typography>
                </Box>
                <Box sx={styles.total}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                    Cultivator fee
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                    <DollarAmountFormatter value={orderById?.fee.feeCultivator} />
                  </Typography>
                </Box>
                <Box sx={styles.total}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    sx={{ color: colors.gray5, mb: 2 }}
                  >
                    Buyer fee
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                    <DollarAmountFormatter value={orderById?.fee.feeBuyer} />
                  </Typography>
                </Box>
                <Box sx={styles.total}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.black1 }}>
                    Total Cultivator Revenue
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.secondary }}>
                    <DollarAmountFormatter value={orderById?.totalCultivator} />
                  </Typography>
                </Box>
                <Box sx={styles.total}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.black1 }}>
                    Total Buyer Payment
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.secondary }}>
                    <DollarAmountFormatter value={orderById?.totalBuyer} />
                  </Typography>
                </Box>
              </Box>

              <Box mt={4} mb={4}>
                <Divider light />
              </Box>

              <Box mb={5}>
                <OrderPickBy order={orderById} />
              </Box>

              <ModalCloseButtonUi zIndex={500} onClose={clearQuery} />
            </>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default AdminOrder;
