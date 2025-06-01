import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import {
  FacilityRoleEnum,
  IInviteModel,
  IMutationSignUpEmployeeArgs,
  IQueryInviteByCodeArgs,
  IUserTokenDto
} from 'graphql/_server';
import SIGN_UP_EMPLOYEE from 'graphql/mutations/signUpEmployee';
import INVITE_BY_CODE from 'graphql/queries/inviteByCode';
import { colors } from 'mui/theme/colors';
import Link from 'next/link';
import router from 'next/router';
import projectConstants from 'projectConstants';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useAuth from 'sharedProject/hooks/useAuth';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthInvitedByFacility from 'components/auth/shared/components/AuthInvitedByFacility/AuthInvitedByFacility';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import styles from './styles';
import { IProps, TInputs } from './types';

const Step1: FC<IProps> = ({ goToStep, code }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [signUpEmployee] = useMutation<
    { signUpEmployee: IUserTokenDto },
    IMutationSignUpEmployeeArgs
  >(SIGN_UP_EMPLOYEE);

  const { setToken } = useAuth();

  const [inviteByCode, setInviteByCode] = useState<IInviteModel | undefined>(undefined);

  const { loading } = useQuery<{ inviteByCode: IInviteModel }, IQueryInviteByCodeArgs>(
    INVITE_BY_CODE,
    {
      variables: {
        payload: {
          code: code
        }
      },
      skip: !code,
      onCompleted: (data) => {
        setInviteByCode(data.inviteByCode);
      }
    }
  );

  const facilityRole = inviteByCode?.facility?.role;
  const metrc = inviteByCode?.facility?.metrcApiKey;

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onSubmit',
    defaultValues: {
      licenseNumberEmployee: '',
      fullName: '',
      email: '',
      password: ''
    }
  });

  return (
    <>
      {isLoading && <Loader />}

      <Box sx={styles.header}>
        <AuthLogo />
      </Box>

      <AuthBlock isShow={!loading}>
        <AuthInvitedByFacility data={inviteByCode} />
      </AuthBlock>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthBlock isShow>
          <>
            {facilityRole === FacilityRoleEnum.Buyer && metrc === '' ? (
              <Controller
                control={control}
                name="fullName"
                rules={validations.requiredText}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputText
                    required
                    tabIndex={1}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    titleText="Full Name"
                    placeholder={'Enter Full Name'}
                    helperText={errors.licenseNumberEmployee?.message || ' '}
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                name="licenseNumberEmployee"
                rules={validations.requiredText}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputText
                    required
                    tabIndex={1}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    titleText="Employee License Number"
                    placeholder={'Enter employee license number'}
                    helperText={errors.licenseNumberEmployee?.message || ' '}
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="email"
              rules={validations.requiredEmail}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  required
                  tabIndex={1}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  titleText="Email"
                  placeholder={'Enter Email'}
                  helperText={errors.email?.message || ' '}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={validations.password}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  required
                  tabIndex={1}
                  isPassword
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  titleText="Password"
                  placeholder={'Password'}
                  helperText={errors.password?.message || ' '}
                />
              )}
            />

            <Divider light />

            <Box mt={3}>
              <ButtonUi var={EButtonType.Primary} type="submit">
                Continue
              </ButtonUi>
            </Box>
          </>
        </AuthBlock>
      </form>
      <Box sx={styles.footer}>
        <Typography variant="body2" fontWeight="bold" color={colors.gray2}>
          Already have an account? <Link href={'/auth'}>Sign In</Link>
        </Typography>
      </Box>
    </>
  );

  async function onSubmit(data: TInputs) {
    try {
      startLoading();

      if (!code) {
        throw new Error(projectConstants.messages.error);
      }

      const response = await signUpEmployee({
        variables: {
          payload: {
            code: code,
            email: data.email,
            fullName:
              facilityRole === FacilityRoleEnum.Buyer && metrc === '' ? data.fullName : undefined,
            licenseNumberEmployee:
              facilityRole === FacilityRoleEnum.Buyer && metrc === ''
                ? '-'
                : data.licenseNumberEmployee,
            password: data.password
          }
        }
      });

      const token = response?.data?.signUpEmployee?.token;

      if (!token) {
        throw new Error(projectConstants.messages.error);
      }

      const user = response?.data?.signUpEmployee?.user;

      if (!user) {
        throw new Error(projectConstants.messages.error);
      }

      setToken(token);
      goToStep({ step: 2 });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default Step1;
