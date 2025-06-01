import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { Box, Divider, Fade, Grid, Switch, Typography } from '@mui/material';
import { IUserModel } from 'graphql/_server';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import AvatarDropZoneEditor from 'sharedProject/components/AvatarDropZoneEditor/AvatarDropZoneEditor';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import ProfileInfo from 'sharedProject/components/profile/ProfileInfo/ProfileInfo';
import SaveProfilePanel from 'sharedProject/components/profile/SaveProfilePanel/SaveProfilePanel';
import useProfileMutations from 'sharedProject/hooks/useProfileMutations';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingUserRole from 'sharedProject/utils/mappingUserRole';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';
import base64ToBlob from 'utils/base64ToBlob';
import getNullFileWithPreview from 'utils/getNullFileWithPreview';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const AdminProfile: FC<{ formData: IUserModel; loading: boolean }> = ({ formData, loading }) => {
  const { updateAdminProfile, isLoading } = useProfileMutations();
  const { clearQuery } = useProjectRouter();
  const client = useApolloClient();

  const [tab, setTab] = useState<string>('My Profile');

  const photo = formData?.asset?.url ? getNullFileWithPreview(formData.asset.url) : undefined;

  const {
    handleSubmit,
    control,
    reset,

    formState: { isDirty, dirtyFields, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      logo: photo,
      phoneNumber: formData.phoneNumber || '',
      fullName: formData.fullName || '',
      messageNotification: formData.adminData.isNotificationContactUs,
      joinNotification: formData.adminData.isNotificationJoinFacility
    }
  });

  return (
    <>
      {isLoading && <Loader />}
      <Fade in={!loading} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <ProfileInfo
            name={formData.fullName}
            createdDate={formData.dates?.createdDate}
            role={mappingUserRole(formData.role)}
          >
            <Box mb={4}>
              <Controller
                control={control}
                name="logo"
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <AvatarDropZoneEditor
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      width={1024}
                      height={1024}
                      isError={Boolean(errors?.logo?.message)}
                    />
                  );
                }}
              />
            </Box>
          </ProfileInfo>

          <Box sx={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <HeaderTabs tabs={['My Profile']} tab={tab} setTab={setTab} />

                <Box mt={4} mb={4}>
                  <Typography variant="subtitle1" fontWeight={'bold'}>
                    General
                  </Typography>
                </Box>

                <Grid container spacing={2} mb={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Controller
                      control={control}
                      name="fullName"
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <InputText
                            titleText="Full Name"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="Enter Full Name"
                          />
                        );
                      }}
                    />
                  </Grid>
                </Grid>

                <Box mb={3}>
                  <Divider light />
                </Box>

                <Box mt={4} mb={4}>
                  <Typography variant="subtitle1" fontWeight={'bold'}>
                    Contact
                  </Typography>
                </Box>

                <Grid container spacing={2} mb={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      rules={validations.phone}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputPhone
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          titleText="Phone #"
                          placeholder="Phone #"
                          helperText={errors.phoneNumber?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputText titleText="Email" value={formData.email} readOnly />
                  </Grid>
                </Grid>

                <Box mb={3}>
                  <Divider light />
                </Box>

                <Box mt={4} mb={4}>
                  <Typography variant="subtitle1" fontWeight={'bold'}>
                    Email Notifications
                  </Typography>
                </Box>
                <Box sx={styles.notificationWrapper}>
                  <Box sx={styles.notification}>
                    <Typography variant="subtitle1">
                      Notify me about new Sign Up Requests
                    </Typography>
                    <Controller
                      control={control}
                      name="joinNotification"
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          color="secondary"
                          checked={value}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={styles.notification}>
                    <Typography variant="subtitle1">
                      Notify me about new Messages from Contact Form
                    </Typography>
                    <Controller
                      control={control}
                      name="messageNotification"
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          color="secondary"
                          checked={value}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <SaveProfilePanel isDirty={isDirty} />
              </>
            </form>
          </Box>
          <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
        </Box>
      </Fade>
    </>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      const photo =
        dirtyFields?.logo && inputs?.logo?.preview
          ? await base64ToBlob(inputs?.logo?.preview)
          : undefined;
      await updateAdminProfile({
        logo: dirtyFields?.logo ? (photo ? photo : null) : undefined,
        payload: {
          phoneNumber: dirtyFields?.phoneNumber
            ? resolvePhoneNumber(inputs.phoneNumber)
            : undefined,
          adminData: {
            isNotificationContactUs: dirtyFields.messageNotification
              ? inputs.messageNotification
              : Boolean(formData.adminData.isNotificationContactUs),
            isNotificationJoinFacility: dirtyFields.joinNotification
              ? inputs.joinNotification
              : Boolean(formData.adminData.isNotificationJoinFacility)
          },
          adminId: String(formData.id),
          fullName: dirtyFields.fullName ? inputs.fullName : undefined
        }
      });
      await client.refetchQueries({
        include: ['meAdmin']
      });
      reset({
        ...inputs
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default AdminProfile;
