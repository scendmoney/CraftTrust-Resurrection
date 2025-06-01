import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Divider, Fade, Grid, InputAdornment, Typography } from '@mui/material';
import { FacilityRoleEnum, IFacilityModel } from 'graphql/_server';
import { FACILITY_BY_ID_ADMIN } from 'graphql/queries/facilityByIdAdmin';
import Routes from 'routes';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import ProfileInfo from 'sharedProject/components/profile/ProfileInfo/ProfileInfo';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { mappingFacilitiesRole } from 'sharedProject/utils/mappingFacilityRole';

import CultivatorUserLineCard from 'components/Cultivator/shared/CultivatorUserLineCard/CultivatorUserLineCard';

import AdminCultivatorStorefront from '../AdminCultivatorStorefront/AdminCultivatorStorefront';

import styles from './styles';

const AdminFacilityProfile: FC<{ id?: string; close: () => Promise<void> }> = ({ id, close }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [facilityById, setFacilityById] = useState<IFacilityModel | undefined>(undefined);
  const { loading: loadingMe } = useQuery<{ facilityByIdAdmin: IFacilityModel }>(
    FACILITY_BY_ID_ADMIN,
    {
      variables: {
        payload: {
          id: id
        }
      },
      onCompleted: (data) => {
        setFacilityById(data.facilityByIdAdmin);
      },
      skip: Boolean(!id)
    }
  );

  const { goToModal } = useProjectRouter();

  const [tab, setTab] = useState<string>('General Info');

  return (
    <>
      <Fade in={!loadingMe} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <ProfileInfo
            name={facilityById?.name}
            createdDate={facilityById?.dates?.createdDate}
            role={mappingFacilitiesRole(facilityById?.role)}
            socials={facilityById?.socials}
            license={facilityById?.license}
          >
            <Box>
              <AvatarUncontrolled src={facilityById?.asset?.url} type={192} />
            </Box>
          </ProfileInfo>

          <Box sx={styles.form}>
            <HeaderTabs tabs={['General Info']} tab={tab} setTab={setTab} />

            {facilityById?.role === FacilityRoleEnum.Cultivator ||
            facilityById?.role === FacilityRoleEnum.BuyerAndCultivator ? (
              <Box mb={2}>
                <Box mt={4} mb={3}>
                  <Typography variant="subtitle1" fontWeight={'bold'}>
                    Storefront
                  </Typography>
                </Box>

                <ButtonUi var={EButtonType.Gray} onClick={() => setIsPreviewOpen(true)}>
                  Preview Storefront
                </ButtonUi>
              </Box>
            ) : null}

            <Box mb={3}>
              <Divider light />
            </Box>

            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight={'bold'}>
                Contact Person
              </Typography>
            </Box>
            <Grid container spacing={2} mb={3}>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  startAdornment={
                    <InputAdornment position="start">
                      <AvatarUncontrolled
                        type={24}
                        variant="rounded"
                        src={facilityById?.userContact?.asset?.url}
                      />
                    </InputAdornment>
                  }
                  titleText="Full Name"
                  placeholder="Contact Person"
                  value={facilityById?.userContact?.fullName || ''}
                  readOnly
                />
              </Grid>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="License #"
                  value={facilityById?.userContact?.license?.licenseNumber}
                  placeholder="-"
                  readOnly
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={3}>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputPhone
                  titleText="Phone #"
                  value={facilityById?.userContact?.phoneNumber}
                  placeholder="-"
                  readOnly
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <InputText
                  titleText="Email"
                  value={facilityById?.userContact?.email}
                  placeholder="-"
                  readOnly
                />
              </Grid>
            </Grid>

            <Box mb={3}>
              <Divider light />
            </Box>
            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight={500}>
                Owner
              </Typography>
            </Box>
            <Grid container spacing={2} mb={2}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <InputText
                  startAdornment={
                    <InputAdornment position="start">
                      <AvatarUncontrolled
                        type={24}
                        variant="rounded"
                        src={facilityById?.owner?.asset?.url}
                      />
                    </InputAdornment>
                  }
                  titleText="Full Name"
                  placeholder="Owner Person"
                  value={facilityById?.owner?.fullName || ''}
                  readOnly
                />
              </Grid>
              {facilityById?.owner?.phoneNumber && (
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputPhone
                    titleText="Phone #"
                    placeholder="-"
                    value={facilityById?.owner?.phoneNumber}
                    readOnly
                  />
                </Grid>
              )}
              {facilityById?.owner?.email && (
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputText titleText="Email" value={facilityById?.owner?.email} readOnly />
                </Grid>
              )}
            </Grid>
            <Box mb={3}>
              <Divider light />
            </Box>
            {(facilityById?.email ||
              facilityById?.address.fullAddress ||
              facilityById?.phoneNumber ||
              facilityById?.campaignEmail) && (
              <>
                <Box mb={4}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Facility Contacts
                  </Typography>
                </Box>
                <Grid container spacing={2} mb={2}>
                  {facilityById?.email && (
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <InputText titleText="Email" value={facilityById?.email} readOnly />
                    </Grid>
                  )}
                  {facilityById?.campaignEmail && (
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <InputText
                        titleText="Notification Campaign Email"
                        value={facilityById?.campaignEmail}
                        readOnly
                      />
                    </Grid>
                  )}
                  {facilityById?.phoneNumber && (
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <InputPhone
                        titleText="Phone #"
                        placeholder="-"
                        value={facilityById?.phoneNumber}
                        readOnly
                      />
                    </Grid>
                  )}
                  {facilityById?.address.fullAddress && (
                    <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                      <InputText
                        titleText="Address"
                        value={facilityById?.address?.fullAddress}
                        readOnly
                      />
                    </Grid>
                  )}
                </Grid>
                <Box mb={3}>
                  <Divider light />
                </Box>
              </>
            )}

            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight={500}>
                License
              </Typography>
            </Box>

            <Grid container spacing={2} mb={2}>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="License #"
                  value={facilityById?.license?.licenseNumber}
                  readOnly
                />
              </Grid>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="Type"
                  value={facilityById?.license?.licenseType}
                  readOnly
                  placeholder="-"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={4}>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="License Start"
                  value={formatDateTimeDateFns(facilityById?.license?.licenseStartDate)}
                  readOnly
                />
              </Grid>
              <Grid item lg={6} md={12} sm={6} xs={12}>
                <InputText
                  titleText="Valid by"
                  value={formatDateTimeDateFns(facilityById?.license?.licenseEndDate)}
                  readOnly
                />
              </Grid>
            </Grid>

            {facilityById?.users?.length ? (
              <>
                <Box mb={3}>
                  <Divider light />
                </Box>
                <Box mt={4} mb={4}>
                  <Typography variant="subtitle1" fontWeight={'bold'}>
                    Employees
                  </Typography>
                </Box>
                <Box sx={styles.facilityList}>
                  {facilityById?.users
                    .filter((item) => item?.email)
                    .map((item) => {
                      return (
                        <CultivatorUserLineCard
                          id={item.id}
                          key={item.id}
                          src={item.asset?.url || undefined}
                          name={item.fullName}
                          onClick={(id, url) =>
                            goToModal(
                              {
                                id: id
                              },
                              url
                            )
                          }
                          url={Routes.ADMIN_USERS}
                          licenseNumber={item.license?.licenseNumber || '—'}
                        />
                      );
                    })}
                </Box>
              </>
            ) : null}
          </Box>
          <ModalCloseButtonUi zIndex={500} onClose={close} />
          <SidebarBottom isOpen={isPreviewOpen} close={() => setIsPreviewOpen(false)} isFullwidth>
            <AdminCultivatorStorefront facilityId={id} onClose={() => setIsPreviewOpen(false)} />
          </SidebarBottom>
        </Box>
      </Fade>
    </>
  );
};

export default AdminFacilityProfile;
