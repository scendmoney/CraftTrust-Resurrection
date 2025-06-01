/* eslint-disable no-console */
import { FC, useMemo, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import TollIcon from '@mui/icons-material/Toll';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { useRouter } from 'next/router';
import useMeClient from 'sharedProject/hooks/useMeClient';

import Loader from 'components/Loader/Loader';

import Messages from './Messages/Messages';
import styles from './stylesMui';
import { IMessage } from './types';

const WalletChat: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { dataMe, loadingMe } = useMeClient();

  const [messages] = useState<IMessage[]>([
    {
      id: 4,
      text: 'Sent 200 HBAR',
      time: 1714409385,
      isMyMessage: false,
      author: dataMe?.fullName || '',
      image: '',
      avatar: dataMe?.asset?.url || '',
      isMoney: true
    },
    {
      id: 3,
      text: 'Cool! I will send the money now',
      time: 1714409385,
      isMyMessage: false,
      author: dataMe?.fullName || '',
      image: '',
      avatar: dataMe?.asset?.url || ''
    },
    {
      id: 2,
      text: 'Everything is fine! I walked with them for 2 hours',
      time: 1714409385,
      isMyMessage: true,
      author: 'Noah, Dog walker',
      image: '/resources/wallet/dogs.jpg',
      avatar: '/resources/wallet/girl.jpg'
    },
    {
      id: 1,
      text: 'How are my dogs doing?',
      time: 1714409385,
      isMyMessage: false,
      author: dataMe?.fullName || '',
      image: '',
      avatar: dataMe?.asset?.url || ''
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(false);

  const stylesUm = useMemo(() => {
    return styles();
  }, []);

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
              onChange={() => console.log('ok')}
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
            <IconButton onClick={() => console.log('send')}>
              <TollIcon />
            </IconButton>
            <IconButton onClick={() => console.log('send')}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !loading && input !== '') {
            console.log('ok');
          }
        }}
      />
    </Box>
  );

  return (
    <>
      {loading && <Loader />}
      <IconButton
        sx={{ position: 'fixed', top: '60px', left: '10px', zIndex: 9999 }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box sx={stylesUm.chat}>
        <Messages
          messages={messages}
          refBottom={refBottom}
          scrollBottom={scrollBottom}
          loadMore={() => console.log('ok')}
          hasMoreMessages={hasMoreMessages}
        />
        {inputComponent}
      </Box>
    </>
  );

  function scrollBottom() {
    if (refBottom.current) {
      refBottom.current.scrollTo({ top: refBottom.current.scrollHeight });
    }
  }
};

export default WalletChat;
