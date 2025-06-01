import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import Drawer from '@mui/material/Drawer';
import {
  IFacilitiesDto,
  IFacilityModel,
  IQueryCultivatorsArgs,
  SortDirectionEnum
} from 'graphql/_server';
import CREATE_CHAT_FACILITY_TO_FACILITY from 'graphql/mutations/createChatFacilityToFacility';
import GENERATE_TOKEN from 'graphql/mutations/generateToken';
import { CULTIVATORS_FOR_CHAT_BUYER } from 'graphql/queries/cultivators';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import { TModalStateClose } from 'sharedArchitech/hooks/useModalState/useModalState';
import { TLabelValue } from 'sharedArchitech/types';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import TwilioChat from 'sharedProject/components/TwilioChat/TwilioChat';

import Loader from 'components/Loader/Loader';

import LayoutClientHeaderChatWrapperHeaderTabs from './LayoutClientHeaderChatWrapperHeaderTabs/LayoutClientHeaderChatWrapperHeaderTabs';
import styles from './styles';

const LayoutClientHeaderChatWrapper: FC<{
  closeModal: TModalStateClose;
  isOpen: boolean;
  selectedUser?: string;
}> = ({ isOpen, closeModal, selectedUser }) => {
  const [generateToken] = useMutation<{ generateToken: string }>(GENERATE_TOKEN);
  const [cultivators, setCultivators] = useState<IFacilityModel[]>([]);
  const [selectedTab, setSelectedTab] = useState<TLabelValue>({
    label: '',
    value: ''
  });

  const { startLoading, stopLoading, isLoading } = useLoading();

  const stylesUm = useMemo(() => {
    return styles();
  }, []);

  const { loading } = useQuery<{ cultivators: IFacilitiesDto }, IQueryCultivatorsArgs>(
    CULTIVATORS_FOR_CHAT_BUYER,
    {
      variables: {
        payload: {
          sorts: [
            {
              columnName: 'facilityBuyerRelations.isMessageCultivator',
              direction: SortDirectionEnum.Desc
            },
            {
              columnName: 'facilityBuyerRelations.dateMessageCultivator',
              direction: SortDirectionEnum.Asc
            }
          ]
        }
      },
      onCompleted: (data) => {
        const items = data?.cultivators?.items || [];
        setCultivators(items);
      }
    }
  );

  const [chat, setChat] = useState<
    { chatSid: string; facilityId: string | number } | null | undefined
  >(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  const [createChatFacilityToFacility] = useMutation<{ createChatFacilityToFacility: string }>(
    CREATE_CHAT_FACILITY_TO_FACILITY
  );

  const tabsUm = useMemo(() => {
    return cultivators.map((item) => {
      return {
        label: item.displayName,
        value: item.id,
        img: item.asset?.url,
        isOnline: item?.isOnline || false,
        isChatMessage: item?.facilityBuyerRelations?.find(
          (facilityRelation) => facilityRelation?.facilityCultivator?.id === item?.id
        )?.isMessageCultivator
      };
    });
  }, [cultivators]);

  useEffect(() => {
    if (selectedUser) {
      const foundUser = tabsUm.find((tab: TLabelValue) => tab.value === selectedUser);
      if (foundUser) {
        handleCreateChatFacilityToFacility(foundUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, tabsUm]);

  return (
    <>
      {isLoading || loading ? <Loader /> : null}

      <Drawer
        anchor="right"
        variant="temporary"
        sx={stylesUm.drawer}
        open={isOpen}
        onClose={closeModal}
        transitionDuration={800}
      >
        <>
          <ModalCloseButtonUi onClose={closeModal} />
          <LayoutClientHeaderChatWrapperHeaderTabs
            tabs={tabsUm}
            tab={selectedTab}
            setTab={handleSelectedCultivator}
            chatSid={chat?.chatSid}
          />

          <TwilioChat token={token} chatSid={chat?.chatSid} facilityId={chat?.facilityId} />
        </>
      </Drawer>
    </>
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
        throw new Error('Can`t get chat sid');
      }
      setChat({
        chatSid: chatSid,
        facilityId: newTab.value
      });

      const tokenResponse = await generateToken();

      const token = tokenResponse.data?.generateToken;

      if (!token) {
        throw new Error('Cant`t get token');
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

export default LayoutClientHeaderChatWrapper;
