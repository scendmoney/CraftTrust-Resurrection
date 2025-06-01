import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import { IMutationLoginArgs, IUserLoginInput, IUserTokenDto } from 'graphql/_server';
import LOGIN from 'graphql/mutations/login';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import projectConstants from 'projectConstants';
import Routes from 'routes';
import useLoading from 'sharedArchitech/hooks/useLoading/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useAuth from 'sharedProject/hooks/useAuth';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';
import redirectAfterAuth from '../shared/utils/redirectAfterAuth';

import styles from './styles';

const EmailSignIn: FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { setToken } = useAuth();
  const router = useRouter();

  const [login] = useMutation<{ login: IUserTokenDto }, IMutationLoginArgs>(LOGIN);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors }
  } = useForm<IUserLoginInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <>
      {isLoading && <Loader />}
      <AuthWrapper>
        <>
          <Box sx={styles.header}>
            <AuthLogo />
            <Typography
              variant="h2"
              variantMapping={{ h2: 'h1' }}
              color={colors.black1}
              textAlign={'center'}
            >
              Craft Trust
            </Typography>
          </Box>

          <AuthBlock isShow>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <>
                <Typography variant="h4" color={colors.secondary} mb={2}>
                  Sign in with E-mail
                </Typography>

                <Controller
                  control={control}
                  name="email"
                  rules={validations.requiredEmail}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputText
                      tabIndex={1}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      titleText="Your Email"
                      placeholder="user@craftrust.com"
                      helperText={errors.email?.message || ' '}
                      required
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
                      value={value}
                      isPassword
                      placeholder="********"
                      onChange={onChange}
                      onBlur={onBlur}
                      titleText="Your Password"
                      helperText={errors.password?.message || ' '}
                      required
                    />
                  )}
                />

                <Box pt={1}>
                  <ButtonUi fullWidth var={EButtonType.Primary} type="submit">
                    Sign In
                  </ButtonUi>
                </Box>

                <Box pt={4} pb={1}>
                  <Divider light />
                </Box>

                <ButtonUi fullWidth var={EButtonType.Text} onClick={handleGoToForgotPassword}>
                  <Typography variant="caption" color={colors.gray2}>
                    Forgot your password?
                  </Typography>
                </ButtonUi>

                <ButtonUi fullWidth var={EButtonType.Text} onClick={handleGoToSmsAuth}>
                  <Typography variant="caption" color={colors.gray2}>
                    Sign in with SMS
                  </Typography>
                </ButtonUi>
              </>
            </form>
          </AuthBlock>
        </>
      </AuthWrapper>
    </>
  );

  async function handleGoToSmsAuth() {
    await router.push(Routes.SIGN_IN_PHONE);
  }

  async function handleGoToForgotPassword() {
    const email = getValues('email');
    await router.push({
      pathname: Routes.SIGN_IN_PASSWORD_RECOVERY,
      query: email ? { email } : undefined
    });
  }

  async function onSubmitLogin(inputs: IUserLoginInput) {
    try {
      startLoading();

      const loginResponse = await login({
        variables: {
          payload: {
            email: inputs.email,
            password: inputs.password
          }
        }
      });

      if (!loginResponse?.data) {
        throw new Error(projectConstants.messages.error);
      }

      const token = loginResponse?.data?.login?.token;

      if (!token) {
        throw new Error(projectConstants.messages.error);
      }

      const user = loginResponse?.data?.login?.user;

      if (!user) {
        throw new Error(projectConstants.messages.error);
      }

      const userRole = user?.role;
      const contextFacilityRole = user?.context?.role;

      const redirectTo = redirectAfterAuth(userRole, contextFacilityRole);

      if (redirectTo) {
        setToken(token);
        await router.push(redirectTo);
      } else {
        setToken('');
        throw new Error(projectConstants.messages.wrongRole);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default EmailSignIn;
