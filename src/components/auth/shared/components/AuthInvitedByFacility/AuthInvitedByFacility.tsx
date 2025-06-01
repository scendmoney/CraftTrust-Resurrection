import { FC } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import { IInviteModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';

const AuthInvitedByFacility: FC<{ data: IInviteModel | undefined }> = ({ data }) => {
  return (
    <Grow timeout={1200} in={Boolean(data?.facility?.id)}>
      <Box sx={styles.container}>
        <Box mb={4}>
          <AvatarUncontrolled src={data?.facility?.asset?.url} type={192} />
        </Box>
        <Typography variant="h4" fontWeight={500}>
          {data?.facility?.name || 'Facility'} has invited you
        </Typography>
        <Typography pt={1} variant="body1" color={colors.gray2}>
          Create account to join them on Craft Trust
        </Typography>
      </Box>
    </Grow>
  );
};

export default AuthInvitedByFacility;
