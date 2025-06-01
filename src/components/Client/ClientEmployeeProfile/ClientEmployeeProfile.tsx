import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Fade, Grid, Typography } from '@mui/material';
import { IUserModel } from 'graphql/_server';
import EMPLOYEE_BY_ID from 'graphql/queries/employeeById';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import ProfileInfo from 'sharedProject/components/profile/ProfileInfo/ProfileInfo';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const ClientEmployeeProfile: FC<{ close: () => Promise<void> }> = ({ close }) => {
  const router = useRouter();
  const [currentEmployee, setCurrentEmployee] = useState<IUserModel | undefined>(undefined);

  const { loading: loadingEmployee } = useQuery<{ employeeById: IUserModel }>(EMPLOYEE_BY_ID, {
    variables: {
      payload: {
        id: nextRouterQueryCheckText(router.query.id)
      }
    },
    onCompleted: (data) => {
      setCurrentEmployee(data.employeeById);
    },
    skip: Boolean(!router.query.id)
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tab, setTab] = useState<string>(`${currentEmployee?.fullName}'s Profile`);

  return (
    <>
      {loadingEmployee && <Loader />}
      <Fade in={!loadingEmployee} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <ProfileInfo
            name={currentEmployee?.fullName}
            createdDate={currentEmployee?.dates?.createdDate}
            license={currentEmployee?.license ? currentEmployee.license : undefined}
          >
            <Box mb={4}>
              <AvatarUncontrolled src={currentEmployee?.asset?.url || undefined} type={192} />
            </Box>
          </ProfileInfo>

          <Box sx={styles.form}>
            <>
              <HeaderTabs
                tabs={[`${currentEmployee?.fullName}'s Profile`]}
                tab={`${currentEmployee?.fullName}'s Profile`}
                setTab={setTab}
              />

              <Box mt={4} mb={4}>
                <Typography variant="subtitle1" fontWeight={'bold'}>
                  Contact
                </Typography>
              </Box>

              <Grid container spacing={2} mb={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputPhone
                    titleText="Phone"
                    value={currentEmployee?.phoneNumber || '-'}
                    readOnly
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputText titleText="Email" value={currentEmployee?.email} readOnly />
                </Grid>
              </Grid>
            </>
          </Box>
          <ModalCloseButtonUi zIndex={1000} onClose={close} />
        </Box>
      </Fade>
    </>
  );
};

export default ClientEmployeeProfile;
