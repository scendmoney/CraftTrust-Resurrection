/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import DoneIcon from '@mui/icons-material/Done';
import { Chip, CircularProgress, Grow, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Message } from '@twilio/conversations';
import { format } from 'date-fns';
import { IFacilityModel } from 'graphql/_server';
import { FACILITY_BY_ID_CHAT } from 'graphql/queries/facilityById';
import EnlargeImage from 'sharedArchitech/components/EnlargeImage/EnlargeImage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import { IMessage } from '../../types';

import stylesMui from './stylesMui';
const UserMessage: FC<{
  item: IMessage;
  meId: string;
  scrollBottom: () => void;
}> = ({ item, meId }) => {
  const dateUm = useMemo(() => {
    const originalDate = item.time;
    if (!originalDate) {
      return {
        short: '',
        long: ''
      };
    }

    return {
      short: format(originalDate, 'hh:mmaaa').toLowerCase(),
      long: format(originalDate, 'MM-dd-yyyy hh:mmaaa').toLowerCase()
    };
  }, [item.time]);

  const [isEnlarge, setEnlarge] = useState<boolean>(false);

  const [isHasImage] = useState<boolean>(Boolean(item?.image));

  const imageUm = useMemo(() => {
    if (!item.image) {
      return null;
    }
    return (
      <Box
        component="img"
        sx={stylesMui.image}
        src={item.image}
        alt="image"
        onClick={enlargeImage}
      />
    );
  }, [isHasImage]);

  // Current User Facility Context Messages
  if (item.isMyMessage) {
    return (
      <>
        <Grow in timeout={1000}>
          <Box sx={stylesMui.myMessage}>
            <Box sx={stylesMui.message}>
              <Box sx={stylesMui.nameLine}>
                <Typography variant="inherit" fontWeight={500}>
                  {item.author}
                </Typography>
                <Typography
                  variant="inherit"
                  fontWeight={400}
                  sx={{ opacity: 0.6 }}
                  title={dateUm.long}
                >
                  {dateUm.short}
                </Typography>
              </Box>

              {imageUm}

              <Typography sx={stylesMui.body} variant="inherit">
                {item.text}
              </Typography>
            </Box>

            <Box>
              <AvatarUncontrolled src={item.avatar} type={48} />
            </Box>
          </Box>
        </Grow>

        {isEnlarge && item.image ? (
          <EnlargeImage image={item.image} closeHandler={closeEnlargeImage} open={isEnlarge} />
        ) : null}
      </>
    );
  }

  // Other Messages
  return (
    <>
      <Grow in timeout={1000}>
        <Box sx={stylesMui.otherMessage}>
          <Box>
            <AvatarUncontrolled src={item.avatar} type={48} />
          </Box>

          <Box sx={stylesMui.message}>
            <Box sx={stylesMui.nameLine}>
              <Typography variant="inherit" fontWeight={500}>
                {item.author}
              </Typography>
              <Typography
                variant="inherit"
                fontWeight={400}
                sx={{ opacity: 0.6 }}
                title={dateUm.long}
              >
                {dateUm.short}
              </Typography>
            </Box>

            {imageUm}

            {item.isMoney ? (
              <>
                <Chip
                  size="medium"
                  sx={{ mt: 1, fontSize: '16px', color: '#fff' }}
                  icon={<DoneIcon />}
                  color="success"
                  label={item.text}
                />
              </>
            ) : (
              <Typography sx={stylesMui.body} variant="inherit">
                {item.text}
              </Typography>
            )}
          </Box>
        </Box>
      </Grow>
      {isEnlarge && item.image ? (
        <EnlargeImage image={item.image} closeHandler={closeEnlargeImage} open={isEnlarge} />
      ) : null}
    </>
  );

  function enlargeImage() {
    setEnlarge(true);
  }
  function closeEnlargeImage() {
    setEnlarge(false);
  }
};

export default memo(UserMessage);
