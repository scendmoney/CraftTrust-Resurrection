import { FC, MutableRefObject } from 'react';
import Box from '@mui/material/Box';

import styles from './styles';

const HeroVideo: FC<{ videoRef: MutableRefObject<HTMLVideoElement | null> }> = ({ videoRef }) => {
  return (
    <Box sx={styles.videoWrapper}>
      <Box
        ref={videoRef}
        sx={styles.video}
        component="video"
        src={'/resources/smoke2.mp4'}
        controls={false}
        muted
        loop
        preload="metadata"
      />
    </Box>
  );
};

export default HeroVideo;
