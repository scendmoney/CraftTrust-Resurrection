import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CREATE_CHAT_FACILITY_TO_FACILITY from 'graphql/mutations/createChatFacilityToFacility';
import GENERATE_TOKEN from 'graphql/mutations/generateToken';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import { TLabelValue } from 'sharedArchitech/types';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import TwilioChat from 'sharedProject/components/TwilioChat/TwilioChat';

import Loader from 'components/Loader/Loader';

import CultivatorMessagesTabs from './CultivatorMessagesTabs/CultivatorMessagesTabs';
import styles from './styles';

const CultivatorMessages: FC = () => {
  const [generateToken] = useMutation<{ generateToken: string }>(GENERATE_TOKEN);
  const [chat, setChat] = useState<
    { chatSid: string; facilityId: string | number } | null | undefined
  >(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const { startLoading, stopLoading, isLoading } = useLoading();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedTab, setSelectedTab] = useState<TLabelValue>({
    label: '',
    value: ''
  });

  const [createChatFacilityToFacility] = useMutation<{ createChatFacilityToFacility: string }>(
    CREATE_CHAT_FACILITY_TO_FACILITY
  );
  return (
    <Box sx={styles.container}>
      {isLoading ? <Loader /> : null}

      {(isMobile && !chat?.chatSid) || !isMobile ? (
        <Box sx={styles.drawerDesktop}>
          <CultivatorMessagesTabs
            tab={selectedTab}
            setTab={handleSelectedCultivator}
            isMobile={isMobile}
          />
        </Box>
      ) : null}

      {(isMobile && chat?.chatSid) || !isMobile ? (
        <Box sx={styles.chat}>
          <TwilioChat
            facilityId={chat?.facilityId}
            token={token}
            chatSid={chat?.chatSid}
            isOnCultivator
          />
        </Box>
      ) : null}

      {isMobile && chat?.chatSid ? (
        <ModalCloseButtonUi zIndex={1000} onClose={() => setChat(null)} />
      ) : null}
    </Box>
  );

  async function handleSelectedCultivator(newTab: TLabelValue) {
    if (typeof newTab.value === 'string') {
      await handleCreateChatFacilityToFacility(newTab);
    }
  }

  async function handleCreateChatFacilityToFacility(newTab: TLabelValue) {
    try {
      startLoading();

      const response = await createChatFacilityToFacility({
        variables: {
          payload: {
            facilityId: newTab.value
          }
        }
      });

      const chatSid = response.data?.createChatFacilityToFacility;

      if (!chatSid) {
        throw new Error('Can`t get token');
      }
      setChat({
        chatSid: chatSid,
        facilityId: newTab.value
      });

      const tokenResponse = await generateToken();

      const token = tokenResponse.data?.generateToken;

      if (!token) {
        throw new Error('Can`t get token');
      }

      setToken(token);
      setSelectedTab(newTab);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default CultivatorMessages;
