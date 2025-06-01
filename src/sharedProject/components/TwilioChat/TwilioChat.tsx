import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Client } from '@twilio/conversations';
import { colors } from 'mui/theme/colors';

import ChatWrapper from './ChatWrapper/ChatWrapper';
import styles from './styles';
import { IProps } from './types';

const TwilioChat: FC<IProps> = ({
  facilityId,
  token,
  chatSid,
  isOnCultivator = false,
  isUserSelected = false
}) => {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (token) {
      setClient(new Client(token));
    }
  }, [token]);

  if (!token) {
    return (
      <Box sx={styles.container}>
        <Typography variant="subtitle1" color={colors.gray5}>
          {isUserSelected ? 'There will be a chat room' : 'Choose a facility to begin chatting.'}
        </Typography>
      </Box>
    );
  }

  if (!chatSid || !client || typeof facilityId !== 'string') {
    return null;
  }

  return (
    <ChatWrapper
      key={chatSid}
      facilityId={facilityId}
      client={client}
      chatSid={chatSid}
      isOnCultivator={isOnCultivator}
    />
  );
};

export default TwilioChat;
