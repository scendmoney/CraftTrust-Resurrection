import { ComponentType, memo } from 'react';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { IFacilityModel } from 'graphql/_server';

import styles from './styles';

const FacilitiesFormatter:
  | ComponentType<{
      facilities: undefined | null | IFacilityModel[];
      userId: string;
    }>
  | undefined = ({ facilities, userId }) => {
  if (!facilities) {
    return <>-</>;
  }

  function getUserRole(facilityOwnerId: string | undefined) {
    if (facilityOwnerId === userId) {
      return 'Owner';
    } else {
      return 'Employee';
    }
  }

  return (
    <Box sx={styles.container}>
      <AvatarGroup max={4} sx={styles.avatarGroup}>
        {facilities.map((item) => {
          return (
            <Tooltip
              key={item.id}
              title={`${item?.displayName}, ${getUserRole(item?.owner?.id)}`}
              placement={'bottom'}
            >
              <Avatar src={item?.asset?.url || '/resources/svg/placeholder.svg'} />
            </Tooltip>
          );
        })}
      </AvatarGroup>
    </Box>
  );
};

export default memo(FacilitiesFormatter);
