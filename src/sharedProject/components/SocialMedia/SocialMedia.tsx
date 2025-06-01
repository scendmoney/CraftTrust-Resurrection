import { FC } from 'react';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { ISocial } from 'graphql/_server';
import FacebookIcon from 'resources/iconsMui/socials/FacebookIcon';
import InstagramIcon from 'resources/iconsMui/socials/InstagramIcon';
import TwitterIcon from 'resources/iconsMui/socials/TwitterIcon';
import WebsiteIcon from 'resources/iconsMui/socials/WebsiteIcon';
import YouTubeIcon from 'resources/iconsMui/socials/YouTubeIcon';

import styles from './styles';

const SocialMedia: FC<{ data: ISocial | undefined }> = ({ data }) => {
  const hasNoSocialLinks =
    !data?.facebook && !data?.instagram && !data?.site && !data?.twitterX && !data?.youtube;

  if (hasNoSocialLinks) return null;

  return (
    <Box sx={styles.container}>
      {data.facebook && (
        <IconButton
          component="a"
          href={data.facebook}
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.button}
        >
          <FacebookIcon />
        </IconButton>
      )}
      {data.twitterX && (
        <IconButton
          component="a"
          href={data.twitterX}
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.button}
        >
          <TwitterIcon />
        </IconButton>
      )}
      {data.instagram && (
        <IconButton
          component="a"
          href={data.instagram}
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.button}
        >
          <InstagramIcon />
        </IconButton>
      )}
      {data.youtube && (
        <IconButton
          component="a"
          href={data.youtube}
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.button}
        >
          <YouTubeIcon />
        </IconButton>
      )}
      {data.site && (
        <IconButton
          component="a"
          href={data.site}
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.button}
        >
          <WebsiteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SocialMedia;
