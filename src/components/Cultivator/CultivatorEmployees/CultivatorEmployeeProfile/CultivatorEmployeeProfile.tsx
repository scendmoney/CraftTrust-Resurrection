import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Fade, Grid, Typography } from '@mui/material';
import { IUserModel } from 'graphql/_server';
import EMPLOYEE_BY_ID from 'graphql/queries/employeeById';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';
import ProfileInfo from 'sharedProject/components/profile/ProfileInfo/ProfileInfo';

import styles from './styles';

const CultivatorEmployeeProfile: FC<{ id?: string; close: () => Promise<void> }> = ({
  id,
  close
}) => {
  const [employeeById, setEmployeeById] = useState<IUserModel | undefined>(undefined);
  const { loading: loadingMe } = useQuery<{ employeeById: IUserModel }>(EMPLOYEE_BY_ID, {
    variables: {
      payload: {
        id: id
      }
    },
    onCompleted: (data) => {
      setEmployeeById(data.employeeById);
    },
    skip: Boolean(!id)
  });

  const [tab, setTab] = useState<string>('Employee');

  return (
    <>
      <Fade in={!loadingMe} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <ProfileInfo
            name={employeeById?.fullName}
            createdDate={employeeById?.joinDate}
            license={employeeById?.license ? employeeById?.license : undefined}
          >
            <Box mb={4}>
              <AvatarUncontrolled src={employeeById?.asset?.url} type={192} />
            </Box>
          </ProfileInfo>

          <Box sx={styles.form}>
            <>
              <HeaderTabs tabs={['Employee']} tab={tab} setTab={setTab} />

              <Box mt={4} mb={4}>
                <Typography variant="subtitle1" fontWeight={'bold'}>
                  Contact
                </Typography>
              </Box>

              <Grid container spacing={2} mb={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputPhone
                    titleText="Phone #"
                    defaultValue={'307-775-9734'}
                    value={employeeById?.phoneNumber}
                    placeholder="-"
                    readOnly
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputText
                    titleText="Email"
                    value={employeeById?.email}
                    placeholder="-"
                    readOnly
                  />
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

export default CultivatorEmployeeProfile;
