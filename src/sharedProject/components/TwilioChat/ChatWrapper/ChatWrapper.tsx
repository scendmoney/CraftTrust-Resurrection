/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Client, Conversation } from '@twilio/conversations';
import { IMutationUpdateTimeChatArgs } from 'graphql/_server';
import UPDATE_CHAT_TIME from 'graphql/mutations/updateTimeChat';

import Loader from 'components/Loader/Loader';

import Chat from '../Chat/Chat';

const ChatWrapper: FC<{
  client: Client;
  facilityId: string;
  chatSid: string;
  isOnCultivator: boolean;
}> = ({ client, facilityId, chatSid, isOnCultivator }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [conversationTwilio, setConversationTwilio] = useState<Conversation | undefined>(undefined);
  const [updateChatTime] = useMutation<{ updateChatTime: boolean }, IMutationUpdateTimeChatArgs>(
    UPDATE_CHAT_TIME
  );
  useEffect(() => {
    client.on('initialized', async () => {
      if (chatSid) {
        const conversation = await client.getConversationBySid(chatSid);
        setConversationTwilio(conversation);
        updateChatTime({
          variables: {
            payload: {
              id: facilityId
            }
          }
        });
      }
    });

    client.on('connectionError', (error) => {
      console.log('Connection error: ', error);
      setLoading(false);
    });

    client.on('connectionStateChanged', (state) => {
      console.log('Connection state changed: ', state);
      setLoading(false);
    });

    client.on('initFailed', ({ error }) => {
      if (error?.message === 'Unknown error during connection initialisation: disconnected\n{}') {
        toast.error('Your internet connection is too unstable to load the chat. Try again later');
      } else {
        toast.error(error?.message || 'Something went wrong');
      }

      setLoading(false);
    });

    // client.on('tokenAboutToExpire', () => {
    //   toast.error('Token is about to expire. Please reconnect to the chat');
    // });

    // client.on('tokenExpired', () => {
    //   toast.error('Token expired. Please reconnect to the chat');
    // });

    return () => {
      client?.removeAllListeners();
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <>
      {loading && <Loader />}
      {conversationTwilio && (
        <Chat
          conversationTwilio={conversationTwilio}
          client={client}
          isOnCultivator={isOnCultivator}
          facilityId={facilityId}
        />
      )}
    </>
  );
};

export default ChatWrapper;
