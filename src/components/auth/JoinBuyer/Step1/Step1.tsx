import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import { IMutationSignUpBuyerArgs, IUserTokenDto } from 'graphql/_server';
import SIGN_UP_BUYER from 'graphql/mutations/signUpBuyer';
import { colors } from 'mui/theme/colors';
import Link from 'next/link';
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

const Step1: FC<IProps> = ({ inviteByCode, goToStep, code }) => {
  const [signUpBuyer] = useMutation<{ signUpBuyer: IUserTokenDto }, IMutationSignUpBuyerArgs>(
    SIGN_UP_BUYER
  );
  const { setToken } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onSubmit',
    defaultValues: {
      licenseNumberFacility: '',
      licenseNumberEmployee: '',
      email: '',
      password: '',
      metrcApiKey: ''
    }
  });

  return (
    <>
      {isLoading && <Loader />}

      <Box sx={styles.header}>
        <AuthLogo />
      </Box>

      <AuthBlock isShow={Boolean(inviteByCode)}>
        <AuthInvitedByFacility data={inviteByCode} />
      </AuthBlock>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthBlock isShow>
          <>
            <Controller
              control={control}
              name="licenseNumberFacility"
              rules={validations.requiredText}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  required
                  tabIndex={1}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  titleText="Facility License Number"
                  placeholder={'Enter facility license number'}
                  helperText={errors.licenseNumberFacility?.message || ' '}
                />
              )}
            />

            <Controller
              control={control}
              name="metrcApiKey"
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  tabIndex={1}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  titleText="Metrc API Key"
                  placeholder={'Please enter API Key'}
                  helperText={errors.metrcApiKey?.message || ' '}
                />
              )}
            />

            <Controller
              control={control}
              name="licenseNumberEmployee"
              rules={validations.requiredText}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  tabIndex={1}
                  value={value}
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                  titleText="License Number of facility Owner"
                  placeholder={'License Number'}
                  helperText={errors.licenseNumberEmployee?.message || ' '}
                />
              )}
            />

            <Box mt={1} mb={3}>
              <Divider light />
            </Box>

            <Controller
              control={control}
              name="email"
              rules={validations.requiredEmail} // TODO
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  required
                  tabIndex={1}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  titleText="Email"
                  placeholder={'Email'}
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
                  tabIndex={1}
                  isPassword
                  required
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
      const loginResponse = await signUpBuyer({
        variables: {
          payload: {
            code: code,
            email: data.email,
            licenseNumberEmployee: data.licenseNumberEmployee,
            licenseNumberFacility: data.licenseNumberFacility,
            password: data.password,
            metrcApiKey: data.metrcApiKey ? data.metrcApiKey : ''
          }
        }
      });

      if (!loginResponse?.data) {
        throw new Error(projectConstants.messages.error);
      }

      const token = loginResponse?.data?.signUpBuyer?.token;

      if (!token) {
        throw new Error(projectConstants.messages.error);
      }

      const user = loginResponse?.data?.signUpBuyer?.user;

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
