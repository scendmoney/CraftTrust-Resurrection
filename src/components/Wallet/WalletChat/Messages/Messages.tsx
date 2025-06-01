import { FC, memo } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMeClient from 'sharedProject/hooks/useMeClient';

import Loader from 'components/Loader/Loader';

import StartMessage from './StartMessage/StartMessage';
import UserMessage from './UserMessage/UserMessage';
import styles from './styles';
import { IProps } from './types';

const Messages: FC<IProps> = ({ messages, refBottom, scrollBottom, loadMore, hasMoreMessages }) => {
  const { dataMe, loadingMe } = useMeClient();
  const meId = dataMe?.id;
  if (loadingMe) {
    return <Loader />;
  }
  if (!meId) {
    toast.error('Error with context: cat`t find user ID context');
    return null;
  }

  return (
    <Box component="div" sx={styles.container} ref={refBottom}>
      {messages.map((item) => {
        return <UserMessage key={item.id} item={item} scrollBottom={scrollBottom} meId={meId} />;
      })}
      {hasMoreMessages && (
        <Button onClick={loadMore} sx={styles.button}>
          Load More
        </Button>
      )}
      <StartMessage />
    </Box>
  );
};

export default memo(Messages);
