import { ComponentType, memo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IFacilityModel } from 'graphql/_server';

import styles from './styles';

const FacilityFormatter:
  | ComponentType<{
      facility: undefined | null | IFacilityModel;
    }>
  | undefined = ({ facility }) => {
  if (!facility) {
    return <>-</>;
  }

  return (
    <Box sx={styles.container}>
      {/* <AvatarGroup max={4} sx={styles.avatarGroup}>
        <Avatar src={facility?.asset?.url || '/resources/svg/placeholder.svg'} />
      </AvatarGroup> */}
      <Typography variant="body1" fontWeight={500}>
        {facility?.displayName}
      </Typography>
    </Box>
  );
};

export default memo(FacilityFormatter);
