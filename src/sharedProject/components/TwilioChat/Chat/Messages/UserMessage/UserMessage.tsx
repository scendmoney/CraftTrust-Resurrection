/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, Grow, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Message } from '@twilio/conversations';
import { format } from 'date-fns';
import { IFacilityModel } from 'graphql/_server';
import { FACILITY_BY_ID_CHAT } from 'graphql/queries/facilityById';
import EnlargeImage from 'sharedArchitech/components/EnlargeImage/EnlargeImage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import stylesMui from './stylesMui';

const UserMessage: FC<{
  item: Message;
  meId: string;
  scrollBottom: () => void;
}> = ({ item, meId }) => {
  const [facilityById, setFacilityById] = useState<IFacilityModel | undefined>(undefined);
  useQuery<{ facilityById: IFacilityModel }>(FACILITY_BY_ID_CHAT, {
    variables: {
      payload: {
        id: item.author
      }
    },
    onCompleted: (data) => {
      setFacilityById(data.facilityById);
    },
    skip: Boolean(!item.author)
  });

  const dateUm = useMemo(() => {
    const originalDate = item.dateCreated;
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
  }, [item.dateCreated]);

  const [isEnlarge, setEnlarge] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [isHasImage] = useState<boolean>(
    (item?.attachedMedia && item?.attachedMedia?.length > 0) || false
  );
  useEffect(() => {
    if (item?.attachedMedia?.length) {
      getMessageMedia();
    }
  }, []);

  const imageUm = useMemo(() => {
    if (isHasImage && !image) {
      return (
        <Box mt={2}>
          <CircularProgress color="inherit" />
        </Box>
      );
    }
    if (isHasImage) {
      return (
        <Box component="img" sx={stylesMui.image} src={image} alt="image" onClick={enlargeImage} />
      );
    }
  }, [isHasImage, image]);

  // Current User Facility Context Messages
  if (meId === item.author) {
    return (
      <>
        <Grow in timeout={1000}>
          <Box sx={stylesMui.myMessage}>
            <Box sx={stylesMui.message}>
              <Box sx={stylesMui.nameLine}>
                <Typography variant="inherit" fontWeight={500}>
                  {facilityById?.displayName || item.author}
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
                {item.body}
              </Typography>
            </Box>

            <Box>
              <AvatarUncontrolled src={facilityById?.asset?.url} type={48} />
            </Box>
          </Box>
        </Grow>

        {isEnlarge && image ? (
          <EnlargeImage image={image} closeHandler={closeEnlargeImage} open={isEnlarge} />
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
            <AvatarUncontrolled src={facilityById?.asset?.url} type={48} />
          </Box>

          <Box sx={stylesMui.message}>
            <Box sx={stylesMui.nameLine}>
              <Typography variant="inherit" fontWeight={500}>
                {facilityById?.displayName || item.author}
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
              {item.body}
            </Typography>
          </Box>
        </Box>
      </Grow>
      {isEnlarge && image ? (
        <EnlargeImage image={image} closeHandler={closeEnlargeImage} open={isEnlarge} />
      ) : null}
    </>
  );

  async function getMessageMedia() {
    if (item?.attachedMedia?.length) {
      const url = await item.attachedMedia[0]?.getContentTemporaryUrl();

      if (url) {
        setImage(url);
        // scrollBottom();
      }
    }
    return null;
  }

  function enlargeImage() {
    setEnlarge(true);
  }
  function closeEnlargeImage() {
    setEnlarge(false);
  }
};

export default memo(UserMessage);
