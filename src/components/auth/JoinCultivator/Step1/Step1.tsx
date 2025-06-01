import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import {
  IMutationSignUpCultivatorArgs,
  ISignUpCultivatorDto,
  IUserTokenDto
} from 'graphql/_server';
import SIGN_UP_CULTIVATOR from 'graphql/mutations/signUpCultivator';
import { colors } from 'mui/theme/colors';
import Link from 'next/link';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useAuth from 'sharedProject/hooks/useAuth';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import styles from './styles';
import { IProps } from './types';

const Step1: FC<IProps> = ({ goToStep, code }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [signUpCultivator] = useMutation<
    { signUpCultivator: IUserTokenDto },
    IMutationSignUpCultivatorArgs
  >(SIGN_UP_CULTIVATOR);

  const { setToken } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ISignUpCultivatorDto>({
    mode: 'onSubmit',
    defaultValues: {
      code: '',
      email: '',
      licenseNumberEmployee: '',
      licenseNumberFacility: '',
      metrcApiKey: '',
      password: ''
    }
  });

  return (
    <>
      {isLoading && <Loader />}

      <Box sx={styles.header}>
        <AuthLogo />
        <Typography
          variant="h2"
          variantMapping={{ h2: 'h1' }}
          color={colors.black1}
          textAlign={'center'}
        >
          Welcome to Craft Trust
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthBlock isShow>
          <>
            <Typography variant="h4" color={colors.secondary} mb={4}>
              Your Facility
            </Typography>
            <Controller
              control={control}
              name="licenseNumberFacility"
              rules={validations.requiredText}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  tabIndex={1}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                  titleText="Facility License Number"
                  placeholder={'Enter facility license number'}
                  helperText={errors.licenseNumberFacility?.message || ' '}
                />
              )}
            />

            <Controller
              control={control}
              name="metrcApiKey"
              rules={validations.requiredText}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputText
                  tabIndex={1}
                  value={value}
                  required
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
                  titleText="Owner License Number"
                  placeholder={'License Number'}
                  helperText={errors.licenseNumberEmployee?.message || ' '}
                />
              )}
            />

            <Divider light />

            <Box mt={3}>
              <Typography variant="h4" color={colors.secondary} mb={4}>
                Your Login Details
              </Typography>
            </Box>

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

  async function onSubmit(data: ISignUpCultivatorDto) {
    try {
      startLoading();

      if (!code) {
        throw new Error('Wrong link');
      }

      const response = await signUpCultivator({
        variables: {
          payload: {
            code: code,
            email: data.email,
            licenseNumberEmployee: data.licenseNumberEmployee,
            licenseNumberFacility: data.licenseNumberFacility,
            metrcApiKey: data.metrcApiKey,
            password: data.password
          }
        }
      });

      if (!response) {
        return null;
      }

      const token = response.data?.signUpCultivator.token;

      if (!token) {
        throw new Error('Wrong token');
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
