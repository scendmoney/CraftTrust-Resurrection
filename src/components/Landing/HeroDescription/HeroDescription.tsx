import { FC, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';

import styles from './styles';

const HeroDescription: FC = () => {
  const [isPlayTitle, setIsPlayTitle] = useState<boolean>(false);
  return (
    <Waypoint
      onEnter={() => {
        setIsPlayTitle(true);
      }}
    >
      <Grow in={isPlayTitle} timeout={2000}>
        <Typography sx={styles.subtitle} variant="inherit">
          <span>CraftTrust</span> introduces marketplace technology that{' '}
          <span>transcends conventional models</span> and{' '}
          <span> shatters the current experience</span> of transacting legal cannabis online.
        </Typography>
      </Grow>
    </Waypoint>
  );
};

export default HeroDescription;
