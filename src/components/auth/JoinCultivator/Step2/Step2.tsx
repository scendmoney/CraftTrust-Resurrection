import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { IFacilityModel, IMutationUpdateFacilityArgs } from 'graphql/_server';
import UPDATE_FACILITY from 'graphql/mutations/updateFacility';
import { colors } from 'mui/theme/colors';
import projectConstants from 'projectConstants';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import AvatarDropZoneEditor from 'sharedProject/components/AvatarDropZoneEditor/AvatarDropZoneEditor';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import GoogleLocationInput from 'sharedProject/components/GoogleLocationInput/GoogleLocationInput';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useMe from 'sharedProject/hooks/useMe';
import useProfileMutations from 'sharedProject/hooks/useProfileMutations';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';
import base64ToBlob from 'utils/base64ToBlob';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import styles from './styles';
import { IProps, TInputs } from './types';

const Step2: FC<IProps> = ({ goToStep }) => {
  const [updateFacility] = useMutation<
    { updateFacility: IFacilityModel },
    IMutationUpdateFacilityArgs
  >(UPDATE_FACILITY);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { dataMe, loadingMe } = useMe();

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields }
  } = useForm<TInputs>({
    mode: 'onSubmit',
    defaultValues: {
      description: '',
      email: '',
      phoneNumber: '',
      address: {
        address: '',
        fullAddress: '',
        googlePlaceId: ''
      },
      logo: undefined
    }
  });

  if (loadingMe) {
    return <Loader />;
  }

  return (
    <>
      {isLoading && <Loader />}

      <Box sx={styles.header}>
        <AuthLogo />
      </Box>

      <AuthBlock isShow={Boolean(dataMe?.context)} lessPadding>
        <>
          <Typography variant="body2" sx={styles.label}>
            Facility
          </Typography>
          <Typography variant="h4" mb={1}>
            {dataMe?.context?.name}
          </Typography>
          <Typography variant="body1" color={colors.gray2}>
            {dataMe?.context?.license?.licenseNumber}
          </Typography>
        </>
      </AuthBlock>

      <AuthBlock isShow={Boolean(dataMe?.context)} lessPadding>
        <>
          <Typography variant="body2" sx={styles.label}>
            Owner
          </Typography>
          <Typography variant="h4" mb={1}>
            {dataMe?.context?.owner?.fullName}
          </Typography>
          <Typography variant="body1" color={colors.gray2}>
            {dataMe?.context?.owner?.email}
          </Typography>
        </>
      </AuthBlock>

      <AuthBlock isShow>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <Typography variant="h4" color={colors.secondary}>
              Add description
            </Typography>

            <Box mt={3} mb={3}>
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
                      isShowUploadButton
                      addIcon={<StorefrontOutlinedIcon fontSize="large" />}
                    />
                  );
                }}
              />
            </Box>

            <Box pb={2}>
              <Divider light />
            </Box>

            <Box pb={3}>
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <InputText
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      titleText="Description"
                      placeholder="Enter Description"
                      multiline
                      maxRows={10}
                    />
                  );
                }}
              />
            </Box>
            <Grid container spacing={2} mb={3}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Controller
                  control={control}
                  name="phoneNumber"
                  rules={validations.requiredPhone}
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
            </Grid>

            <ButtonUi var={EButtonType.Primary} type="submit">
              Create Storefront
            </ButtonUi>
          </>
        </form>
      </AuthBlock>
    </>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      startLoading();

      const photo = inputs?.logo?.preview ? await base64ToBlob(inputs?.logo?.preview) : undefined;
      const response = await updateFacility({
        variables: {
          logo: photo,
          payload: {
            description: inputs.description,
            phoneNumber: inputs.phoneNumber ? resolvePhoneNumber(inputs.phoneNumber) : undefined,
            address: inputs?.address
              ? {
                  address: inputs.address?.address || null,
                  fullAddress: inputs.address?.fullAddress || null,
                  googlePlaceId: inputs.address?.googlePlaceId || null
                }
              : undefined
          }
        }
      });

      if (!response) {
        return;
      }

      goToStep({ step: 3 });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default Step2;
