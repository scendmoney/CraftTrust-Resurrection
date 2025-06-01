import { FC, memo } from 'react';
import { makeVar, useApolloClient, useReactiveVar, useSubscription } from '@apollo/client';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IFacilityToFacilityModel } from 'graphql/_server';
import { CHAT_MESSAGE_FOR_BUYER } from 'graphql/subscriptions/chatMessage';
import useMe from 'sharedProject/hooks/useMe';

import LayoutClientHeaderChatWrapper from './LayoutClientHeaderChatWrapper/LayoutClientHeaderChatWrapper';
import LayoutClientHeaderDesktop from './LayoutClientHeaderDesktop/LayoutClientHeaderDesktop';
import LayoutClientHeaderMobile from './LayoutClientHeaderMobile/LayoutClientHeaderMobile';

export const chatRv = makeVar<
  | {
      isChatOpen: boolean;
      chatSid?: string;
    }
  | undefined
>(undefined);

const LayoutClientHeader: FC = () => {
  const theme = useTheme();
  const chat = useReactiveVar(chatRv);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { dataMe, refetch } = useMe();
  const isChatMessage = dataMe?.context?.isChatMessage;

  const client = useApolloClient();

  useSubscription<{ chatMessage: IFacilityToFacilityModel }>(CHAT_MESSAGE_FOR_BUYER, {
    onSubscriptionData: () => {
      refetch();
      client.refetchQueries({
        include: ['cultivators']
      });
    }
  });

  if (isMobile) {
    return (
      <>
        <LayoutClientHeaderMobile openChat={openChat} isChatMessage={isChatMessage || false} />
        {chat?.isChatOpen && (
          <LayoutClientHeaderChatWrapper
            isOpen={true}
            closeModal={closeChat}
            selectedUser={chat?.chatSid}
          />
        )}
      </>
    );
  }
  return (
    <>
      <LayoutClientHeaderDesktop openChat={openChat} isChatMessage={isChatMessage || false} />
      {chat?.isChatOpen && (
        <LayoutClientHeaderChatWrapper
          isOpen={true}
          closeModal={closeChat}
          selectedUser={chat?.chatSid}
        />
      )}
    </>
  );

  function openChat() {
    chatRv({
      isChatOpen: true
    });
  }

  function closeChat() {
    chatRv(undefined);
  }
};

export default memo(LayoutClientHeader);
