import { FC, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { IUserModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import projectConstants from 'projectConstants';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import AvatarDropZoneEditor from 'sharedProject/components/AvatarDropZoneEditor/AvatarDropZoneEditor';
import GoogleLocationInput from 'sharedProject/components/GoogleLocationInput/GoogleLocationInput';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputSelect from 'sharedProject/components/inputs/InputSelect/InputSelect';
import { TSelectOptions } from 'sharedProject/components/inputs/InputSelect/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import InviteEmployee from 'sharedProject/components/InviteEmployee/InviteEmployee';
import SaveProfilePanel from 'sharedProject/components/profile/SaveProfilePanel/SaveProfilePanel';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import useProfileMutations from 'sharedProject/hooks/useProfileMutations';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';
import base64ToBlob from 'utils/base64ToBlob';
import getNullFileWithPreview from 'utils/getNullFileWithPreview';

import Loader from 'components/Loader/Loader';

import ClientEmployeeProfile from '../ClientEmployeeProfile/ClientEmployeeProfile';
import ClientFaq from '../shared/ClientFaq/ClientFaq';

import ClientFacilityEmployees from './ClientFacilityEmployees/ClientFacilityEmployees';
import ClientFacilityInvites from './ClientFacilityInvites/ClientFacilityInvites';
import styles from './styles';
import { TInputs } from './types';

const ClientFacilityProfile: FC<{ user: IUserModel }> = ({ user }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const client = useApolloClient();
  const { id, clearQuery } = useProjectRouter();
  const { isOpen, openModal, closeModal } = useModalState();

  const { updateFacility, isLoading } = useProfileMutations();

  const facilityUsersUm: TSelectOptions[] = useMemo(() => {
    if (user.context?.users) {
      return user.context?.users
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
  }, [user.context?.users]);

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
      logo: user?.context?.asset?.url
        ? getNullFileWithPreview(user?.context?.asset?.url)
        : undefined,
      userContactId: user?.context?.userContact?.id,
      description: user?.context?.description || '',
      displayName: user?.context?.displayName,
      email: user?.context?.email || '',
      phoneNumber: user?.context?.phoneNumber || '',
      address: {
        address: user?.context?.address?.address || '',
        fullAddress: user?.context?.address?.fullAddress || '',
        googlePlaceId: user?.context?.address?.googlePlaceId || ''
      },
      socials: {
        facebook: user?.context?.socials.facebook || '',
        instagram: user?.context?.socials.instagram || '',
        site: user?.context?.socials.site || '',
        twitterX: user?.context?.socials.twitterX || '',
        youtube: user?.context?.socials.youtube || ''
      },
      campaignEmail: user?.context?.campaignEmail || ''
    }
  });

  const userContactId = watch('userContactId');

  const currentfacilityUserInfoUm = useMemo(() => {
    if (user.context?.users) {
      return user.context?.users.find((item) => item.id === userContactId);
    }
  }, [user.context?.users, userContactId]);

  const facilityUm = useMemo(() => {
    return user?.context;
  }, [user?.context]);

  return (
    <Box sx={styles.wrapper}>
      {isLoading && <Loader />}

      <Box sx={styles.license}>
        <Typography variant={isMobile ? 'h2' : 'h1'}>
          {facilityUm?.displayName || facilityUm?.name}
          {/* &nbsp;
          {facilityUm?.license.isLicenseActive && (
            <Tooltip
              title={
                <Typography variant="caption" textAlign={'center'}>
                  {`License is active until ${formatDateTimeDateFns(
                    facilityUm?.license?.licenseEndDate
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

      <Box sx={styles.blockWrapper}>
        <Box sx={styles.contentWrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={styles.facilityInfoWraper}>
              <Typography variant="h3" fontWeight={500} mb={5}>
                Facility Info
              </Typography>
              <Box sx={styles.facilityContent}>
                <Box sx={styles.licenseWrapper}>
                  <Grid container spacing={2}>
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
                  <Typography variant="subtitle1" fontWeight={500} mb={3}>
                    Delivery
                  </Typography>
                  <Grid container>
                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                      <Controller
                        control={control}
                        name="address"
                        render={({ field: { value, onChange } }) => (
                          <GoogleLocationInput value={value} onChange={onChange} />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Box mb={3} mt={2}>
                    <Divider light />
                  </Box>
                  <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Facility Contacts
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
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
                  <Box mb={3} mt={1}>
                    <Divider light />
                  </Box>
                  <Box mb={3}>
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
                  <Box mt={2} mb={3}>
                    <Divider light />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={500} mb={3}>
                    Contact Person
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
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
                    </Grid>
                    {currentfacilityUserInfoUm?.phoneNumber && (
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <InputPhone
                          titleText="Phone #"
                          value={currentfacilityUserInfoUm?.phoneNumber}
                          readOnly
                        />
                      </Grid>
                    )}

                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <InputText
                        titleText="Email"
                        value={currentfacilityUserInfoUm?.email}
                        readOnly
                      />
                    </Grid>
                  </Grid>
                  <Box mt={2} mb={3}>
                    <Divider light />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={500} mb={3}>
                    Manage Campaign
                  </Typography>
                  <Grid container spacing={2}>
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
                </Box>

                <Box>
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
              </Box>
            </Box>
            <SaveProfilePanel isDirty={isDirty} />
          </form>

          <Box sx={styles.facilityInfoWraper}>
            <Typography variant="h3" fontWeight={500} mb={3}>
              Employees
            </Typography>
            <Box onClick={() => openModal()} sx={styles.buttonAdd}>
              <AddCircleOutlineIcon htmlColor={colors.secondary} />
              <Typography variant="body1" fontWeight={500} color="secondary">
                Add Employee
              </Typography>
            </Box>
            <ClientFacilityEmployees />
            <Typography variant="h3" fontWeight={500} mt={3} mb={3}>
              Invitations
            </Typography>
            {facilityUm && <ClientFacilityInvites facility={facilityUm} />}
          </Box>
        </Box>
        <ClientFaq />
      </Box>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery}>
        <ClientEmployeeProfile close={clearQuery} />
      </SidebarBottom>

      <InviteEmployee isOpen={isOpen} closeModal={closeModal} from="buyer" />
    </Box>
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

export default ClientFacilityProfile;
