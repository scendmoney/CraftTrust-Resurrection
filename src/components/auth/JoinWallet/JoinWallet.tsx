import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { IGenerateCodeSmsInput, IMutationGenerateCodeSmsArgs } from 'graphql/_server';
import GENERATE_CODE_SMS from 'graphql/mutations/generateCodeSms';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import Routes from 'routes';
import useLoading from 'sharedArchitech/hooks/useLoading/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';

import Loader from 'components/Loader/Loader';
import WalletWrapper from 'components/Wallet/shared/WalletWrapper/WalletWrapper';
import useMagicLink from 'sharedProject/hooks/useMagicLink';

import AuthButtons from '../shared/components/AuthButtons/AuthButtons';

import styles from './styles';

const JoinWallet: FC<{ subcompanyId?: number; phone?: string }> = ({ subcompanyId, phone }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showWallet, isReady } = useMagicLink();

  const router = useRouter();

  const handleConnectWallet = async () => {
    if (!isReady || !showWallet) {
      toast.error('Magic Link is not ready yet');
      return;
    }

    try {
      startLoading();
      await showWallet();
      toast.success('Wallet connected successfully!');
      // Handle successful wallet connection
      // router.push('/dashboard');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      stopLoading();
    }
  };

  const [generateCodeSMS] = useMutation<{ generateCodeSMS: boolean }, IMutationGenerateCodeSmsArgs>(
    GENERATE_CODE_SMS
  );

  const {
    handleSubmit,
    control,

    formState: { errors }
  } = useForm<{ phone: string; fullName: string }>({
    mode: 'onSubmit',
    defaultValues: {
      phone: phone || '',
      fullName: ''
    }
  });

  return (
    <>
      {isLoading && <Loader />}

      <WalletWrapper isBurger={false}>
        <Box sx={styles.block}>
          <Box mb={2}>
            <Typography variant="h2" variantMapping={{ h2: 'h1' }} color={colors.black1}>
              Welcome
              <br /> to Top-Shelf Grams
            </Typography>
          </Box>
          <Box mb={4}>
            {subcompanyId ? (
              <Typography variant="subtitle1" color={colors.black1}>
                Sign in to Continue
              </Typography>
            ) : null}
          </Box>

          <form onSubmit={handleSubmit(handleLoginSMS)}>
            <>
              <Typography variant="h4" color={colors.secondary} mb={2}>
                Sign in with SMS
              </Typography>

              <Controller
                control={control}
                name="phone"
                rules={validations.requiredPhone}
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

              <Controller
                control={control}
                name="fullName"
                rules={validations.text}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <InputText
                      titleText="Your Name"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Snoop Dogg"
                      helperText={errors.fullName?.message || ' '}
                    />
                  );
                }}
              />

              <Box pb={3}>
                <Divider light />
              </Box>

              <AuthButtons>
                <ButtonUi fullWidth var={EButtonType.Primary} type="submit">
                  Continue
                </ButtonUi>
              </AuthButtons>
            </>
          </form>
          <Box sx={{ mt: 2 }}>
            <ButtonUi fullWidth var={EButtonType.Secondary} onClick={handleConnectWallet}>
              Connect Wallet
            </ButtonUi>
          </Box>
        </Box>
      </WalletWrapper>
    </>
  );
  async function handleLoginSMS(inputs: { phone: string; fullName: string }) {
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
          pathname: Routes.SIGN_UP_WALLET_CHECK_SMS_CODE,
          query: {
            phone: `${inputs.phone}`,
            subcompanyId: subcompanyId,
            fullName: inputs.fullName
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

export default JoinWallet;