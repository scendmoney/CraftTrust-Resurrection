import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import {
  IGenerateCodeSmsInput,
  IMutationGenerateCodeSmsArgs,
  IMutationLoginSmsArgs,
  IUserTokenDto
} from 'graphql/_server';
import GENERATE_CODE_SMS from 'graphql/mutations/generateCodeSms';
import LOGIN_SMS from 'graphql/mutations/loginSms';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import projectConstants from 'projectConstants';
import Routes from 'routes';
import useLoading from 'sharedArchitech/hooks/useLoading/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputCode from 'sharedProject/components/inputs/InputCode/InputCode';
import useAuth from 'sharedProject/hooks/useAuth';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';
import redirectAfterAuth from '../shared/utils/redirectAfterAuth';

import styles from './styles';

const SignIn: FC<{ phone: string }> = ({ phone }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const router = useRouter();
  const { setToken } = useAuth();
  const [timer, setTimer] = useState(301);
  const [canResendCode, setCanResendCode] = useState(false);

  const [loginSMS] = useMutation<{ loginSMS: IUserTokenDto }, IMutationLoginSmsArgs>(LOGIN_SMS);
  const [generateCodeSMS] = useMutation<{ generateCodeSMS: boolean }, IMutationGenerateCodeSmsArgs>(
    GENERATE_CODE_SMS
  );

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<{
    code: string;
    phoneNumber: string;
  }>({
    mode: 'onSubmit',
    defaultValues: {
      phoneNumber: phone,
      code: undefined
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResendCode(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Очистка таймера при размонтировании
  }, []);

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
                  Sign in with Phone
                </Typography>

                <Controller
                  control={control}
                  name="code"
                  rules={{
                    required: 'Code is required',
                    minLength: { value: 4, message: 'Code must be 4 digits' },
                    maxLength: { value: 4, message: 'Code must be 4 digits' }
                  }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputCode
                      tabIndex={1}
                      value={value}
                      onValueChange={onChange}
                      onBlur={onBlur}
                      titleText="Code from SMS"
                      helperText={errors.code?.message || ''}
                      required
                    />
                  )}
                />

                <Box sx={styles.sendAgain}>
                  {canResendCode ? (
                    <ButtonUi var={EButtonType.Text} onClick={handleResendCode}>
                      <Typography variant="caption" color="primary">
                        Resend Code
                      </Typography>
                    </ButtonUi>
                  ) : (
                    <ButtonUi var={EButtonType.Text} disabled>
                      <Typography variant="caption">
                        Resend code in {Math.floor(timer / 60)}:
                        {String(timer % 60).padStart(2, '0')}
                      </Typography>
                    </ButtonUi>
                  )}
                </Box>

                <Box pb={3}>
                  <Divider light />
                </Box>

                <Box sx={styles.buttons}>
                  <ButtonUi fullWidth var={EButtonType.Primary} type="submit">
                    Sign In
                  </ButtonUi>
                  <ButtonUi onClick={handleCancel} var={EButtonType.Bordered}>
                    Cancel
                  </ButtonUi>
                </Box>
              </>
            </form>
          </AuthBlock>
        </>
      </AuthWrapper>
    </>
  );

  async function handleCancel() {
    await router.push(Routes.SIGN_IN_PHONE);
  }

  async function handleResendCode() {
    if (canResendCode) {
      try {
        startLoading();
        await generateCodeSMS({
          variables: { payload: { phone: resolvePhoneNumber(phone) } as IGenerateCodeSmsInput }
        });
        toast.success(`The code was successfully sent to phone number +1${phone}`);
        setTimer(300);
        setCanResendCode(false);
      } catch (err) {
        toast.error(`Failed to resend code to the phone +1${phone}. Please try again later`);
      } finally {
        stopLoading();
      }
    }
  }

  async function onSubmit(inputs: { code: string; phoneNumber: string }) {
    try {
      startLoading();

      const response = await loginSMS({
        variables: {
          payload: {
            code: Number(inputs.code),
            phoneNumber: resolvePhoneNumber(phone)
          }
        }
      });
      const token = response?.data?.loginSMS?.token;

      if (!token) {
        throw new Error(projectConstants.messages.error);
      }

      const user = response?.data?.loginSMS?.user;

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

export default SignIn;
