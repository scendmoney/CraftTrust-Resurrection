import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import { IGenerateCodeSmsInput, IMutationGenerateCodeSmsArgs } from 'graphql/_server';
import GENERATE_CODE_SMS from 'graphql/mutations/generateCodeSms';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import Routes from 'routes';
import useLoading from 'sharedArchitech/hooks/useLoading/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';
import useMagicLink from 'sharedProject/hooks/useMagicLink';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';

import styles from './styles';

const PhoneSignIn: FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { magicSMSLogin, isReady } = useMagicLink(); // Initialize Magic Link hook

  const router = useRouter();

  const [generateCodeSMS] = useMutation<{ generateCodeSMS: boolean }, IMutationGenerateCodeSmsArgs>(
    GENERATE_CODE_SMS
  );

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IGenerateCodeSmsInput>({
    mode: 'onChange',
    defaultValues: {
      phone: ''
    }
  });

  const handleLoginSMS = async (data: IGenerateCodeSmsInput) => {
    if (!isReady || !magicSMSLogin) {
      toast.error('Magic Link is not ready yet');
      return;
    }

    try {
      startLoading();
      const phoneNumber = resolvePhoneNumber(data.phone);
      const didToken = await magicSMSLogin(phoneNumber);
      
      if (didToken) {
        // Here you would typically send the didToken to your backend
        // for verification and user authentication
        toast.success('SMS sent! Check your phone.');
        // You can redirect or handle the token as needed
        // router.push('/dashboard');
      }
    } catch (error) {
      console.error('Magic SMS login failed:', error);
      toast.error('Failed to send SMS. Please try again.');
    } finally {
      stopLoading();
    }
  };

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
            <form onSubmit={handleSubmit(handleLoginSMS)}>
              <>
                <Typography variant="h4" color={colors.secondary} mb={2}>
                  Sign in with SMS
                </Typography>

                <Controller
                  control={control}
                  name="phone"
                  // rules={validations.requiredPhone}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputPhone
                      tabIndex={1}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      titleText="Your Phone"
                      helperText={errors.phone?.message || ' '}
                      required
                    />
                  )}
                />

                <Box mt={1}>
                  <ButtonUi fullWidth var={EButtonType.Primary} type="submit">
                    Continue
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

  async function handleLoginSMS(inputs: IGenerateCodeSmsInput) {
    try {
      startLoading();

      const response = await generateCodeSMS({
        variables: {
          payload: {
            phone: resolvePhoneNumber(inputs.phone)
          }
        }
      });
      if (response.data?.generateCodeSMS) {
        await router.push({
          pathname: `/auth/sms-code`,
          query: {
            phone: `${inputs.phone}`
          }
        });
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default PhoneSignIn;