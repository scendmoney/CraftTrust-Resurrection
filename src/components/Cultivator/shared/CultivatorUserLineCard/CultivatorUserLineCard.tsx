import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from 'mui/theme/colors';
import Routes from 'routes';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';

const CultivatorUserLineCard: FC<{
  id: string | number;
  name: string;
  licenseNumber: string;
  src?: string | undefined;
  onClick: (id: number | string, url: Routes) => void;
  url: Routes;
}> = ({ name, licenseNumber, src }) => {
  return (
    <Box sx={styles.block}>
      <AvatarUncontrolled src={src} />
      <Box sx={styles.name}>
        <Typography variant="body1" fontWeight={500}>
          {name}
        </Typography>
        <Typography variant="body2" fontWeight={500} color={colors.gray2}>
          Lic #{licenseNumber}
        </Typography>
      </Box>
    </Box>
  );
};

export default CultivatorUserLineCard;
