import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ILicense, ISocial } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import SocialMedia from 'sharedProject/components/SocialMedia/SocialMedia';

import styles from './styles';

const ProfileInfo: FC<{
  children: ReactElement;
  name?: string;
  role?: string;
  socials?: ISocial;
  createdDate?: string;
  license?: ILicense | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ name, role, createdDate, children, socials, license }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        {children}

        <Box my={2} mx={1}>
          <Box sx={styles.license}>
            <Typography variant="h3" fontWeight={'400'}>
              {name}
              {/* &nbsp;
              {license?.isLicenseActive && (
                <Tooltip
                  title={
                    <Typography variant="caption" textAlign={'center'}>
                      {`License is active until ${formatDateTimeDateFns(license?.licenseEndDate)}`}
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
          {role && (
            <Typography variant="body2" fontWeight={'bold'} color={colors.secondary}>
              {role}
            </Typography>
          )}
        </Box>

        <Divider />
        {socials ? (
          <Box my={2}>
            <SocialMedia data={socials} />
          </Box>
        ) : null}
        <Box mx={1} mt={socials ? 0 : 2}>
          <Typography variant="body2" color={colors.gray2}>
            Joined
          </Typography>
          <Typography pt={0.5} variant="body2">
            {formatDateTimeDateFns(createdDate)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
