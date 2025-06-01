import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { Box, Fade, Grid, Switch, Typography } from '@mui/material';
import { IUserModel, UserRoleEnum } from 'graphql/_server';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import ProfileInfo from 'sharedProject/components/profile/ProfileInfo/ProfileInfo';
import SaveProfilePanel from 'sharedProject/components/profile/SaveProfilePanel/SaveProfilePanel';
import useProfileMutations from 'sharedProject/hooks/useProfileMutations';
import mappingUserRole from 'sharedProject/utils/mappingUserRole';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const AdminUserProfile: FC<{
  user: IUserModel;
  close: () => Promise<void>;
  contextRole: UserRoleEnum | undefined;
  loading: boolean;
}> = ({ user, close, contextRole, loading }) => {
  const { updateAdminProfile, isLoading } = useProfileMutations();
  const client = useApolloClient();
  const {
    handleSubmit,
    control,
    reset,

    formState: { isDirty, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      isBlocked: !user.isBlocked,
      email: user.email || ''
    }
  });

  const [tab, setTab] = useState<string>('Admin Profile');

  return (
    <>
      <Fade in={!loading} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          {isLoading && <Loader />}
          <ProfileInfo
            name={user.fullName}
            createdDate={user.dates?.createdDate}
            role={mappingUserRole(user.role)}
          >
            <Box>
              <AvatarUncontrolled src={user?.asset?.url} type={192} />
            </Box>
          </ProfileInfo>

          <Box sx={styles.form}>
            <HeaderTabs tabs={['Admin Profile']} tab={tab} setTab={setTab} />

            <Box mt={4} mb={4}>
              <Typography variant="subtitle1" fontWeight={'bold'}>
                Email Notifications
              </Typography>
            </Box>
            <Grid container spacing={2} mb={3}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box sx={styles.notificationWrapper}>
                  <Box sx={styles.notification}>
                    <Typography variant="subtitle1">
                      Notify me about new Sign Up Requests
                    </Typography>
                    <Switch
                      color="secondary"
                      checked={user?.adminData.isNotificationContactUs}
                      disabled
                    />
                  </Box>
                  <Box sx={styles.notification}>
                    <Typography variant="subtitle1">
                      Notify me about new Messages from Contact Form
                    </Typography>
                    <Switch
                      color="secondary"
                      checked={user?.adminData.isNotificationJoinFacility}
                      disabled
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box mt={4} mb={4}>
              <Typography variant="subtitle1" fontWeight={'bold'}>
                Contact
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} mb={3}>
                <Grid item lg={6} md={12} sm={6} xs={12}>
                  <InputPhone
                    titleText="Phone #"
                    value={user?.phoneNumber}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={6} xs={12}>
                  <Controller
                    control={control}
                    rules={validations.requiredEmail}
                    name="email"
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <InputText
                          titleText="Email"
                          placeholder="Email"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          helperText={errors.email?.message || ' '}
                          readOnly={contextRole !== UserRoleEnum.OwnerPlatform}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
              <Box mt={4} mb={4}>
                <Typography variant="subtitle1" fontWeight={'bold'}>
                  Status
                </Typography>
              </Box>

              <Grid container spacing={2} mb={3}>
                <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                  <Box sx={styles.terms}>
                    <Typography variant="subtitle1">Active</Typography>
                    <Controller
                      control={control}
                      name="isBlocked"
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          color="secondary"
                          checked={value}
                          disabled={contextRole !== UserRoleEnum.OwnerPlatform}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                  </Box>
                  <SaveProfilePanel isDirty={isDirty} />
                </Grid>
              </Grid>
            </form>
          </Box>
          <ModalCloseButtonUi zIndex={500} onClose={close} />
        </Box>
      </Fade>
    </>
  );

  async function onSubmit(inputs: TInputs) {
    if (!user?.adminData) {
      return null;
    }
    try {
      await updateAdminProfile({
        payload: {
          adminId: String(user?.id),
          email: String(inputs.email),
          adminData: {
            isNotificationContactUs: user?.adminData?.isNotificationContactUs,
            isNotificationJoinFacility: user?.adminData?.isNotificationJoinFacility
          },
          isBlocked: !inputs.isBlocked
        }
      });
      await client.refetchQueries({
        include: ['userById']
      });
      reset({
        ...inputs
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default AdminUserProfile;
