import { FC, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

import data from './data';
import styles from './styles';

const AboutPlatform: FC = () => {
  const [isPlayBenefits, setIsPlayBenefits] = useState<boolean>(false);
  const [isPlaySubtitle, setIsPlaySubtitle] = useState<boolean>(false);

  return (
    <>
      <Waypoint onEnter={() => setIsPlaySubtitle(true)} bottomOffset="300px">
        <Box>
          <Grow in={isPlaySubtitle} timeout={2000}>
            <Box sx={styles.titleWrapper}>
              <Typography sx={styles.subtitle}>
                CraftTrust is a decentralized (Web 3) platform and ecosystem for legal cannabis
                operators. It puts you squarely in control of digital transactions and promises to
                reshape the digital landscape for buyers, sellers, and even consumers; all
                seamlessly connecting, transacting, and engaging in a vibrant, trustworthy
                marketplace and community.
              </Typography>
              <Typography sx={styles.subtitle}>
                Unlike any other online cannabis marketplace, CraftTrust’s platform and ecosystem
                are built atop Hedera Hashgraph public ledger technology, ensuring platform
                security, regulatory compliance, market transparency, and trust… for both buyers and
                sellers at every level.
              </Typography>
            </Box>
          </Grow>
        </Box>
      </Waypoint>
      <Waypoint onEnter={() => setIsPlayBenefits(true)} bottomOffset="300px">
        <Box sx={styles.benefits}>
          {data.map((item) => {
            return (
              <Grow key={item.id} in={isPlayBenefits} timeout={item.delay}>
                <Box sx={styles.benefit}>
                  <Box>
                    <Box component="img" src={item.img} />
                  </Box>

                  <Typography color={colors.white} variant="h3" sx={styles.title}>
                    {item.title}
                  </Typography>
                  <Typography color={colors.gray5} variant="body1" sx={styles.caption}>
                    {item.description}
                  </Typography>
                </Box>
              </Grow>
            );
          })}
        </Box>
      </Waypoint>
    </>
  );
};

export default AboutPlatform;
