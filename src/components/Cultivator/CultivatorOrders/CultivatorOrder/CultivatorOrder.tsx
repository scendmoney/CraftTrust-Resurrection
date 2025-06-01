import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Divider, Fade, Typography, useMediaQuery } from '@mui/material';
import { IOrderModel, IQueryOrderByIdArgs } from 'graphql/_server';
import CREATE_CHAT_FACILITY_TO_FACILITY from 'graphql/mutations/createChatFacilityToFacility';
import GENERATE_TOKEN from 'graphql/mutations/generateToken';
import ORDER_BY_ID from 'graphql/queries/orderById';
import { colors } from 'mui/theme/colors';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import TwilioChat from 'sharedProject/components/TwilioChat/TwilioChat';

import Loader from 'components/Loader/Loader';
import LoaderCompletedOrder from 'components/LoaderCompletedOrder/LoaderCompletedOrder';

import OrderInfo from './OrderInfo/OrderInfo';
import OrderItems from './OrderItems/OrderItems';
import OrderNextStep from './OrderNextStep/OrderNextStep';
import OrderPaymentStatus from './OrderPaymentStatus/OrderPaymentStatus';
import OrderPickBy from './OrderPickBy/OrderPickBy';
import styles from './styles';

const CultivatorOrder: FC<{ id: string; close: () => Promise<void> }> = ({ id, close }) => {
  const [orderById, setOrderById] = useState<IOrderModel | undefined>(undefined);
  const [completed, setCompleted] = useState(false);
  const [openMobileChat, setOpenMobileChat] = useState<boolean>(false);

  const [generateToken] = useMutation<{ generateToken: string }>(GENERATE_TOKEN);

  const { loading } = useQuery<{ orderById: IOrderModel }, IQueryOrderByIdArgs>(ORDER_BY_ID, {
    variables: {
      payload: {
        id: Number(id)
      }
    },
    onCompleted: (data) => {
      const item = data.orderById;
      setOrderById(item);
    },
    skip: !id
  });

  const { startLoading, stopLoading, isLoading } = useLoading();

  const [tab, setTab] = useState<string>('Order Details');
  const [token, setToken] = useState<string | undefined>(undefined);

  const [chat, setChat] = useState<
    { chatSid: string; facilityId: string | number } | null | undefined
  >(null);

  const isMobile = useMediaQuery('(max-width:1050px)');

  const stylesUm = useMemo(() => {
    return styles(isMobile, openMobileChat);
  }, [isMobile, openMobileChat]);

  const [createChatFacilityToFacility] = useMutation<{ createChatFacilityToFacility: string }>(
    CREATE_CHAT_FACILITY_TO_FACILITY
  );

  useEffect(() => {
    if (orderById?.facilityBuyer?.id) {
      handleCreateChatFacilityToFacility(orderById?.facilityBuyer.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderById?.facilityBuyer?.id]);

  useEffect(() => {
    if (!isMobile) {
      setOpenMobileChat(false);
    }
  }, [isMobile]);

  if (loading) {
    return <Loader />;
  }

  if (!id) {
    return null;
  }

  if (!orderById) {
    return null;
  }

  return (
    <>
      {(isLoading || loading) && <Loader />}

      <Fade in timeout={1000}>
        <Box sx={stylesUm.container}>
          <OrderInfo order={orderById} openChat={setOpenMobileChat} />
          <Box sx={stylesUm.form}>
            <>
              <HeaderTabs tabs={['Order Details']} tab={tab} setTab={setTab} />

              <OrderPaymentStatus order={orderById} />

              <OrderItems order={orderById} />

              <Box mt={4} mb={4}>
                <Divider light />
              </Box>
              <Box sx={stylesUm.totalWrapper}>
                <Box sx={stylesUm.total}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    sx={{ color: colors.gray5, mb: 1 }}
                  >
                    Products
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                    <DollarAmountFormatter value={orderById?.total} />
                  </Typography>
                </Box>
                <Box sx={stylesUm.total}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    sx={{ color: colors.gray5, mb: 2 }}
                  >
                    Platform fee
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
                    <DollarAmountFormatter value={orderById?.fee.feeCultivator} />
                  </Typography>
                </Box>
                <Box sx={stylesUm.total}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.black1 }}>
                    Revenue
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.secondary }}>
                    <DollarAmountFormatter value={orderById?.totalCultivator} />
                  </Typography>
                </Box>
              </Box>

              <Box mt={4} mb={4}>
                <Divider light />
              </Box>

              <Box mb={8}>
                <OrderPickBy order={orderById} />
              </Box>

              {!isMobile && <ModalCloseButtonUi zIndex={500} onClose={close} />}
              <OrderNextStep order={orderById} setCompleted={setCompleted} />
              {completed && <LoaderCompletedOrder setCompleted={setCompleted} />}
              <Box pb={6} />
            </>
          </Box>

          <Box sx={stylesUm.chat}>
            <TwilioChat
              token={token}
              chatSid={chat?.chatSid}
              facilityId={chat?.facilityId}
              isUserSelected
            />
            {isMobile ? (
              <ModalCloseButtonUi zIndex={1030} onClose={() => setOpenMobileChat(false)} />
            ) : null}
          </Box>

          {isMobile && <ModalCloseButtonUi zIndex={10} onClose={close} />}
        </Box>
      </Fade>
    </>
  );

  async function handleCreateChatFacilityToFacility(id: string) {
    try {
      startLoading();

      const response = await createChatFacilityToFacility({
        variables: {
          payload: {
            facilityId: id
          }
        }
      });

      const chatSid = response.data?.createChatFacilityToFacility;

      if (!chatSid) {
        throw new Error('Cant get token');
      }
      setChat({
        chatSid: chatSid,
        facilityId: id
      });

      const tokenResponse = await generateToken();

      const token = tokenResponse.data?.generateToken;

      if (!token) {
        throw new Error('Cant get token');
      }

      setToken(token);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default CultivatorOrder;
