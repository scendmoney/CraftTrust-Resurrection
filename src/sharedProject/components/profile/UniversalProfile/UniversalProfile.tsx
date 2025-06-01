import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { Box, Divider, Grid, Typography } from '@mui/material';
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
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';
import base64ToBlob from 'utils/base64ToBlob';
import getNullFileWithPreview from 'utils/getNullFileWithPreview';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const UniversalProfile: FC<{ initialData: IUserModel }> = ({ initialData }) => {
  const { updateUser, isLoading } = useProfileMutations();

  const { query, clearDynamicQuery } = useProjectRouter();
  const client = useApolloClient();

  const [tab, setTab] = useState<string>('My Profile');

  const {
    handleSubmit,
    control,
    reset,
    getValues,

    formState: { isDirty, dirtyFields, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      logo: initialData?.asset?.url ? getNullFileWithPreview(initialData.asset.url) : undefined,
      phoneNumber: initialData?.phoneNumber || '',
      displayName: initialData?.fullName || ''
    }
  });

  return (
    <>
      {isLoading && <Loader />}

      <Box sx={styles.container}>
        <ProfileInfo
          name={initialData?.fullName}
          createdDate={initialData?.dates?.createdDate}
          license={initialData?.license ? initialData.license : undefined}
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

              <Grid container mt={4}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Controller
                    control={control}
                    name="displayName"
                    rules={validations.requiredText}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <InputText
                          titleText="Full Name"
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

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight={'bold'}>
                  Contact
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    rules={validations.phone}
                    render={({ field, fieldState }) => (
                      <InputPhone
                        helperText={errors.phoneNumber?.message || ' '}
                        invalid={fieldState.invalid}
                        titleText="Phone #"
                        placeholder="US Phone Number"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputText
                    titleText="Email"
                    value={initialData?.email}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
              </Grid>

              <SaveProfilePanel isDirty={isDirty} />
            </>
          </form>
        </Box>
        <ModalCloseButtonUi zIndex={1000} onClose={handleClearQuery} />
      </Box>
    </>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      const photo =
        dirtyFields?.logo && inputs?.logo?.preview
          ? await base64ToBlob(inputs?.logo?.preview)
          : undefined;
      await updateUser({
        logo: dirtyFields?.logo ? (photo ? photo : null) : undefined,
        payload: {
          phoneNumber: getValues('phoneNumber') ? resolvePhoneNumber(inputs.phoneNumber) : null,
          fullName: dirtyFields?.displayName ? inputs.displayName : undefined
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

  function handleClearQuery() {
    clearDynamicQuery(
      query?.id
        ? {
            id: query?.id
          }
        : {}
    );
  }
};

export default UniversalProfile;
