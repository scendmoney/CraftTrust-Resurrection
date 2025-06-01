import { FC } from 'react';
import { Box, CardActionArea, Typography } from '@mui/material';
import { IFacilityModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';

const ProfileInfoFacilityList: FC<{
  facility: IFacilityModel;
  userId: string | undefined;
}> = ({ userId, facility }) => {
  const { goToModal } = useProjectRouter();
  function getUserRole(facilityOwnerId: string | undefined) {
    if (facilityOwnerId === userId) {
      return 'Owner';
    } else {
      return 'Employee';
    }
  }
  return (
    <CardActionArea
      sx={styles.cardAction}
      onClick={() => goToModal({ id: facility.id }, 'facilities')}
    >
      <Box sx={styles.block}>
        <AvatarUncontrolled src={facility.asset?.url || undefined} type={48} />
        <Box sx={styles.name}>
          <Typography variant="subtitle1" fontWeight={500}>
            {facility.displayName || facility.name}
          </Typography>
          <Typography variant="body2" color={colors.gray2}>
            {getUserRole(facility.owner?.id)}
          </Typography>
        </Box>
      </Box>
    </CardActionArea>
  );
};

export default ProfileInfoFacilityList;
