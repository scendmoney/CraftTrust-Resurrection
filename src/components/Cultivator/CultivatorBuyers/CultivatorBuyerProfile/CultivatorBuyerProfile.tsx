import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Fade, useMediaQuery } from '@mui/material';
import { IFacilityModel } from 'graphql/_server';
import CREATE_CHAT_FACILITY_TO_FACILITY from 'graphql/mutations/createChatFacilityToFacility';
import GENERATE_TOKEN from 'graphql/mutations/generateToken';
import { FACILITY_BY_ID_BUYER_CULTIVATOR } from 'graphql/queries/facilityById';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import TwilioChat from 'sharedProject/components/TwilioChat/TwilioChat';

import CultivatorBuyerGeneral from './CultivatorBuyerGeneral/CultivatorBuyerGeneral';
import CultivatorBuyerTerms from './CultivatorBuyerTerms/CultivatorBuyerTerms';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './styles';

const CultivatorBuyerProfile: FC<{ id?: string; close: () => Promise<void> }> = ({ id, close }) => {
  const [facilityById, setFacilityById] = useState<IFacilityModel | undefined>(undefined);
  const [openMobileChat, setOpenMobileChat] = useState<boolean>(false);
  const [generateToken] = useMutation<{ generateToken: string }>(GENERATE_TOKEN);
  const { loading: loadingMe } = useQuery<{ facilityById: IFacilityModel }>(
    FACILITY_BY_ID_BUYER_CULTIVATOR,
    {
      variables: {
        payload: {
          id: id
        }
      },
      onCompleted: (data) => {
        setFacilityById(data.facilityById);
      },
      skip: Boolean(!id),
      fetchPolicy: 'network-only'
    }
  );

  const { startLoading, stopLoading, isLoading } = useLoading();

  const [tab, setTab] = useState<string>('General Info');
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
    if (id) {
      handleCreateChatFacilityToFacility(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!isMobile) {
      setOpenMobileChat(false);
    }
  }, [isMobile]);

  return (
    <>
      <Fade in={!loadingMe && !isLoading} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={stylesUm.container}>
          <ProfileInfo data={facilityById} openChat={setOpenMobileChat}>
            <Box>
              <AvatarUncontrolled src={facilityById?.asset?.url} type={192} />
            </Box>
          </ProfileInfo>

          <Box sx={stylesUm.form}>
            <>
              <HeaderTabs tabs={['General Info', 'Payment Terms']} tab={tab} setTab={setTab} />

              {tab === 'General Info' && <CultivatorBuyerGeneral data={facilityById} id={id} />}

              {tab === 'Payment Terms' && <CultivatorBuyerTerms data={facilityById} />}

              {!isMobile && <ModalCloseButtonUi zIndex={500} onClose={close} />}
            </>
          </Box>
          {chat?.chatSid ? (
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
          ) : null}
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

export default CultivatorBuyerProfile;
