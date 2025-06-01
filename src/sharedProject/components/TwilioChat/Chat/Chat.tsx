import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { Client, Conversation, Message } from '@twilio/conversations';
import { IMutationUpdateTimeChatArgs } from 'graphql/_server';
import UPDATE_CHAT_TIME from 'graphql/mutations/updateTimeChat';
import _ from 'lodash';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';

import Loader from 'components/Loader/Loader';

import Messages from './Messages/Messages';
import styles from './stylesMui';

const Chat: FC<{
  client: Client;
  conversationTwilio: Conversation;
  isOnCultivator: boolean;
  facilityId: string;
}> = ({ client, conversationTwilio, isOnCultivator, facilityId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [updateChatTime] = useMutation<{ updateChatTime: boolean }, IMutationUpdateTimeChatArgs>(
    UPDATE_CHAT_TIME
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(false);

  useEffect(() => {
    if (messages.length === 0) {
      initialGetMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    client.on('messageAdded', async () => {
      await getLastMessages();
      await updateChatTime({
        variables: {
          payload: {
            id: facilityId
          }
        }
      });
      scrollBottom();
    });

    return () => {
      client?.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stylesUm = useMemo(() => {
    return styles(isOnCultivator);
  }, [isOnCultivator]);

  const refInput = useRef<HTMLInputElement | null>(null);
  const refBottom = useRef<HTMLDivElement | null>(null);

  const inputComponent = (
    <Box sx={stylesUm.inputZone}>
      <InputBase
        sx={stylesUm.input}
        type="text"
        autoComplete="off"
        ref={refInput}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={`Type text`}
        autoFocus
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <input
              type="file"
              id="upload-photo"
              style={{ display: 'none' }}
              onChange={uploadFileHandler}
              accept="image/png, image/jpeg"
            />
            <label htmlFor="upload-photo">
              <IconButton aria-label="upload picture" component="span">
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
            </label>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !loading && input !== '') {
            sendMessage();
          }
        }}
      />
    </Box>
  );

  return (
    <>
      {loading && <Loader />}

      <Box sx={stylesUm.chat}>
        <Messages
          messages={messages}
          refBottom={refBottom}
          scrollBottom={scrollBottom}
          loadMore={loadMoreMessages}
          hasMoreMessages={hasMoreMessages}
        />
        {inputComponent}
      </Box>
    </>
  );

  async function loadMoreMessages() {
    try {
      const newMessages = await conversationTwilio.getMessages(5, messages.length);

      if (newMessages.items.length > 0) {
        setMessages((prevMessages) => _.uniqBy([...prevMessages, ...newMessages.items], 'sid'));

        const total = await conversationTwilio.getMessagesCount();
        setHasMoreMessages(messages.length + newMessages.items.length < total);
      } else {
        setHasMoreMessages(false);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function sendMessage() {
    try {
      if (input === '' && refInput?.current) {
        refInput.current.focus();
        return;
      }
      setLoading(true);
      await conversationTwilio.prepareMessage().setBody(input).buildAndSend();
      setInput('');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function scrollBottom() {
    if (refBottom.current) {
      refBottom.current.scrollTo({ top: refBottom.current.scrollHeight });
    }
  }

  async function initialGetMessages() {
    try {
      setLoading(true);
      const messages = await conversationTwilio.getMessages(5);

      setMessages(messages.items.reverse());

      const total = await conversationTwilio.getMessagesCount();

      setHasMoreMessages(messages.items.length < total);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function getLastMessages() {
    try {
      const messages = await conversationTwilio.getMessages(1);
      setMessages((prevMessages) => [...messages.items, ...prevMessages]);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function uploadFileHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event?.target?.files?.length) {
      try {
        const file = event.target.files[0];
        await sendMediaMessage(file);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  }

  async function sendMediaMessage(file: File) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('userfile', file);

      await conversationTwilio.prepareMessage().addMedia(formData).buildAndSend();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
};

export default Chat;
