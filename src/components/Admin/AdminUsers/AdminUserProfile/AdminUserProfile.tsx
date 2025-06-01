import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Divider, Fade, Grid, Typography } from '@mui/material';
import { IUserModel } from 'graphql/_server';
import USER_BY_ID from 'graphql/queries/userById';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './styles';

const AdminUserProfile: FC<{ id?: string; close: () => Promise<void> }> = ({ id, close }) => {
  const [userById, setUserById] = useState<IUserModel | undefined>(undefined);
  const { loading: loadingMe } = useQuery<{ userById: IUserModel }>(USER_BY_ID, {
    variables: {
      payload: {
        id: id
      }
    },
    onCompleted: (data) => {
      setUserById(data.userById);
    },
    skip: Boolean(!id)
  });

  const [tab, setTab] = useState<string>('User Profile');

  return (
    <>
      <Fade in={!loadingMe} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <ProfileInfo user={userById}>
            <Box>
              <AvatarUncontrolled src={userById?.asset?.url} type={192} />
            </Box>
          </ProfileInfo>

          <Box sx={styles.form}>
            <HeaderTabs tabs={['User Profile']} tab={tab} setTab={setTab} />

            <Box mt={4} mb={4}>
              <Typography variant="subtitle1" fontWeight={'bold'}>
                Contact
              </Typography>
            </Box>
            <Grid container spacing={2} mb={3}>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputPhone
                  titleText="Phone #"
                  value={userById?.phoneNumber}
                  readOnly
                  placeholder="-"
                />
              </Grid>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText titleText="Email" value={userById?.email} readOnly placeholder="-" />
              </Grid>
            </Grid>

            <Box mb={3}>
              <Divider light />
            </Box>

            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight={'bold'}>
                License
              </Typography>
            </Box>

            <Grid container spacing={2} mb={2}>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="License #"
                  value={userById?.license?.licenseNumber}
                  readOnly
                  placeholder="-"
                />
              </Grid>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="Type"
                  value={userById?.license?.licenseType}
                  readOnly
                  placeholder="-"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={4}>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="License Start"
                  value={formatDateTimeDateFns(userById?.license?.licenseStartDate)}
                  placeholder="-"
                  readOnly
                />
              </Grid>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="Valid by"
                  value={formatDateTimeDateFns(userById?.license?.licenseEndDate)}
                  placeholder="-"
                  readOnly
                />
              </Grid>
            </Grid>
          </Box>
          <ModalCloseButtonUi zIndex={500} onClose={close} />
        </Box>
      </Fade>
    </>
  );
};

export default AdminUserProfile;
