import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IUserModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';

import ProfileInfoFacilityList from './ProfileInfoFacilityList/ProfileInfoFacilityList';
import styles from './styles';

const ProfileInfo: FC<{
  children: ReactElement;
  user: IUserModel | undefined;
}> = ({ children, user }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        {children}
        <Box sx={styles.license}>
          <Typography variant="h3" fontWeight={'400'}>
            {user?.fullName}
            {/* &nbsp;
            {user?.license?.isLicenseActive && (
              <Tooltip
                title={
                  <Typography variant="caption" textAlign={'center'}>
                    {`License is active until ${formatDateTimeDateFns(
                      user?.license?.licenseEndDate
                    )}`}
                  </Typography>
                }
                placement={'bottom'}
              >
                <Box component={'span'} sx={styles.licenseIcon}>
                  <CompletedIcon fill={colors.green} />
                </Box>
              </Tooltip>
            )} */}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2" color={colors.gray2}>
            Facility
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {(user?.userToFacilities || []).map((item) => {
              return <ProfileInfoFacilityList key={item.id} facility={item} userId={user?.id} />;
            })}
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant="body2" color={colors.gray2}>
            Joined
          </Typography>
          <Typography pt={0.5} variant="body2">
            {formatDateTimeDateFns(user?.dates?.createdDate)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
