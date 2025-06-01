import { FC } from 'react';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';

import { IUser } from './types';

const WalletContacts: FC<{ chats: IUser[] }> = ({ chats }) => {
  const router = useRouter();
  return (
    <>
      <Box sx={{ pb: 9, mx: 2 }}>
        <Box mt={2} display="flex" gap={1} flexDirection="column">
          {chats.map((item) => {
            return (
              <Card elevation={0} key={item.id}>
                <CardActionArea
                  onClick={() => router.push('/wallet/stoners/chat/12892')}
                  disabled={item.disabled}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <CardContent>
                      <Typography component="div" variant="h4">
                        {item.name}
                      </Typography>

                      <Typography component="div" variant="caption" mt={1} color={colors.gray2}>
                        {item.phone}
                      </Typography>
                    </CardContent>

                    <Box mr={1}>
                      <Avatar src={item.avatar} />
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default WalletContacts;
