import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import { IUserEmailInput } from 'graphql/_server';
import FORGOT_PASSWORD from 'graphql/mutations/forgotPassword';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import Routes from 'routes';
import useLoading from 'sharedArchitech/hooks/useLoading/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';

import styles from './styles';

const PasswordRecovery: FC<{ email?: string }> = ({ email = '' }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const router = useRouter();

  const [isSent, setIsSent] = useState<boolean>(false);

  const [forgotPassword] = useMutation<{ forgotPassword: boolean }, { payload: IUserEmailInput }>(
    FORGOT_PASSWORD
  );

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<{ email: string }>({
    mode: 'onSubmit',
    defaultValues: {
      email: email
    }
  });

  if (isSent) {
    return (
      <AuthWrapper>
        <>
          <Box sx={styles.sent}>
            <AuthLogo />
            <Typography
              variant="h3"
              variantMapping={{ h2: 'h1' }}
              color={colors.black1}
              textAlign={'center'}
            >
              An email with password reset instructions has been sent to your email address.
            </Typography>
          </Box>
        </>
      </AuthWrapper>
    );
  }

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <Typography variant="h4" color={colors.secondary} mb={2}>
                  Password Recovery
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

                <Box mt={1}>
                  <ButtonUi fullWidth var={EButtonType.Primary} type="submit">
                    Send Reset Link
                  </ButtonUi>
                </Box>

                <Box pt={4} pb={1}>
                  <Divider light />
                </Box>

                <ButtonUi fullWidth var={EButtonType.Text} onClick={handleGoToEmailAuth}>
                  <Typography variant="caption" color={colors.gray2}>
                    Sign in with E-mail
                  </Typography>
                </ButtonUi>
              </>
            </form>
          </AuthBlock>
        </>
      </AuthWrapper>
    </>
  );

  async function handleGoToEmailAuth() {
    await router.push(Routes.SIGN_IN);
  }

  async function onSubmit(inputs: { email: string }) {
    try {
      startLoading();

      const response = await forgotPassword({
        variables: { payload: { email: inputs.email } }
      });

      if (response.data?.forgotPassword) {
        setIsSent(true);
      } else {
        throw new Error('Something went wrong. Please try again later.');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default PasswordRecovery;
