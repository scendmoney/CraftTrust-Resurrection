import { FC, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { Box, Divider, Fade, Grid, Typography } from '@mui/material';
import { IUserModel } from 'graphql/_server';
import projectConstants from 'projectConstants';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import AvatarDropZoneEditor from 'sharedProject/components/AvatarDropZoneEditor/AvatarDropZoneEditor';
import GoogleLocationInput from 'sharedProject/components/GoogleLocationInput/GoogleLocationInput';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputSelect from 'sharedProject/components/inputs/InputSelect/InputSelect';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import ProfileInfo from 'sharedProject/components/profile/ProfileInfo/ProfileInfo';
import SaveProfilePanel from 'sharedProject/components/profile/SaveProfilePanel/SaveProfilePanel';
import useProfileMutations from 'sharedProject/hooks/useProfileMutations';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';
import base64ToBlob from 'utils/base64ToBlob';
import getNullFileWithPreview from 'utils/getNullFileWithPreview';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs, TSelectOptions } from './types';

const CultivatorFacilityProfile: FC<{
  initialData: IUserModel;
}> = ({ initialData }) => {
  const { updateFacility, isLoading } = useProfileMutations();
  const { clearQuery } = useProjectRouter();
  const client = useApolloClient();

  const [tab, setTab] = useState<string>('General Info');

  const {
    handleSubmit,
    control,

    getValues,
    reset,

    watch,
    formState: { isDirty, dirtyFields, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      logo: initialData?.context?.asset?.url
        ? getNullFileWithPreview(initialData?.context?.asset?.url)
        : undefined,
      userContactId: initialData?.context?.userContact?.id,
      description: initialData?.context?.description || '',
      displayName: initialData?.context?.displayName,
      email: initialData?.context?.email || '',
      phoneNumber: initialData?.context?.phoneNumber || '',
      address: {
        address: initialData?.context?.address?.address || '',
        fullAddress: initialData?.context?.address?.fullAddress || '',
        googlePlaceId: initialData?.context?.address?.googlePlaceId || ''
      },

      socials: {
        facebook: initialData?.context?.socials.facebook || '',
        instagram: initialData?.context?.socials.instagram || '',
        site: initialData?.context?.socials.site || '',
        twitterX: initialData?.context?.socials.twitterX || '',
        youtube: initialData?.context?.socials.youtube || ''
      },
      campaignEmail: initialData?.context?.campaignEmail || ''
    }
  });

  const userContactId = watch('userContactId');

  const facilityUsersUm: TSelectOptions[] = useMemo(() => {
    if (initialData?.context?.users) {
      return initialData.context?.users
        .filter((item) => Boolean(item?.email))
        .map((item) => {
          return {
            value: item.id,
            label: item.fullName || item.email || 'Unnamed User',
            logo: item.asset?.url || ' '
          };
        });
    }
    return [];
  }, [initialData.context?.users]);

  const currentfacilityUserInfoUm = useMemo(() => {
    if (initialData.context?.users) {
      return initialData.context?.users.find((item) => item.id === userContactId);
    }
  }, [initialData.context?.users, userContactId]);

  const facilityUm = useMemo(() => {
    return initialData?.context;
  }, [initialData?.context]);

  return (
    <>
      {isLoading && <Loader />}
      <Fade in timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <ProfileInfo
            name={facilityUm?.displayName || facilityUm?.name}
            createdDate={facilityUm?.credentialedDate}
            license={facilityUm?.license}
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
                <HeaderTabs tabs={['General Info', 'Description']} tab={tab} setTab={setTab} />

                {tab === 'Description' && (
                  <>
                    <Box pb={3} pt={3}>
                      <Controller
                        control={control}
                        name="description"
                        render={({ field: { value, onChange, onBlur } }) => {
                          return (
                            <InputText
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              multiline
                              minRows={10}
                            />
                          );
                        }}
                      />
                    </Box>
                  </>
                )}

                {tab === 'General Info' && (
                  <>
                    <Grid container spacing={2} my={2}>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="displayName"
                          rules={validations.requiredText}
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="Facility Name"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder="Enter Full Name"
                                helperText={errors.displayName?.message || ' '}
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
                      <Typography variant="subtitle1" fontWeight={500}>
                        Facility Contacts
                      </Typography>
                    </Box>
                    <Grid container spacing={2} mb={3}>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="email"
                          rules={validations.email}
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="Facility Email"
                                placeholder="Enter Email"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                helperText={errors.email?.message || ' '}
                              />
                            );
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="phoneNumber"
                          rules={validations.phone}
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputPhone
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                titleText="Facility Phone Number"
                                placeholder="Enter Phone Number"
                                helperText={errors.phoneNumber?.message || ' '}
                              />
                            );
                          }}
                        />
                      </Grid>

                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="address"
                          render={({ field: { value, onChange } }) => (
                            <GoogleLocationInput value={value} onChange={onChange} />
                          )}
                        />
                      </Grid>

                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="socials.site"
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="Website"
                                placeholder="Enter Website Address"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                              />
                            );
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Box mb={3}>
                      <Divider light />
                    </Box>

                    <Box mt={4} mb={3}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Social
                      </Typography>
                    </Box>

                    <Grid container spacing={2} mb={2}>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="socials.facebook"
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="Facebook"
                                placeholder="Enter Facebook Address"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                              />
                            );
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="socials.instagram"
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="Instagram"
                                placeholder="Enter Instagram Address"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                              />
                            );
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="socials.twitterX"
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="X"
                                placeholder="Enter X Address"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                              />
                            );
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="socials.youtube"
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="YouTube"
                                placeholder="Enter YouTube Address"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
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
                      <Typography variant="subtitle1" fontWeight={500}>
                        Contact Person
                      </Typography>
                    </Box>

                    <Box mb={2}>
                      <Controller
                        control={control}
                        name="userContactId"
                        render={({ field: { value, onChange, onBlur } }) => {
                          return (
                            <InputSelect
                              titleText="Select"
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              options={facilityUsersUm}
                            />
                          );
                        }}
                      />
                    </Box>

                    <Grid container spacing={2} mb={3}>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <InputPhone
                          titleText="Phone #"
                          placeholder="US Phone Number"
                          value={currentfacilityUserInfoUm?.phoneNumber}
                          readOnly
                        />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <InputText
                          titleText="Email"
                          value={currentfacilityUserInfoUm?.email}
                          readOnly
                        />
                      </Grid>
                    </Grid>

                    <Box mb={3}>
                      <Divider light />
                    </Box>
                    <Box mt={4} mb={4}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Manage Campaign
                      </Typography>
                    </Box>
                    <Grid container>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Controller
                          control={control}
                          name="campaignEmail"
                          rules={validations.email}
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputText
                                titleText="Campaign Notification Email"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder="Owner's email is used by default"
                                helperText={errors.campaignEmail?.message || ' '}
                              />
                            );
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

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
      if (!facilityUm) {
        throw new Error(projectConstants.messages.error);
      }

      await updateFacility({
        logo: dirtyFields?.logo ? (photo ? photo : null) : undefined,
        payload: {
          description: getValues('description') ? inputs.description : null,
          userContactId: dirtyFields?.userContactId ? inputs.userContactId : undefined,
          displayName: dirtyFields?.displayName ? inputs.displayName : undefined,
          email: dirtyFields?.email ? inputs.email : undefined,
          phoneNumber: dirtyFields?.phoneNumber
            ? resolvePhoneNumber(inputs.phoneNumber)
            : undefined,
          address: dirtyFields?.address
            ? {
                address: inputs.address?.address || null,
                fullAddress: inputs.address?.fullAddress || null,
                googlePlaceId: inputs.address?.googlePlaceId || null
              }
            : undefined,
          socials: {
            facebook: dirtyFields?.socials?.facebook ? inputs.socials.facebook : undefined,
            instagram: dirtyFields?.socials?.instagram ? inputs.socials.instagram : undefined,
            site: dirtyFields?.socials?.site ? inputs.socials.site : undefined,
            twitterX: dirtyFields?.socials?.twitterX ? inputs.socials.twitterX : undefined,
            youtube: dirtyFields?.socials?.youtube ? inputs.socials.youtube : undefined
          },
          campaignEmail: dirtyFields?.campaignEmail
            ? getValues('campaignEmail')
              ? inputs.campaignEmail
              : null
            : undefined
        }
      });
      await client.refetchQueries({
        include: ['me']
      });
      reset({
        ...inputs
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default CultivatorFacilityProfile;
