import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import {
  IGenerateCodeSmsInput,
  IMutationCreateSurveyArgs,
  IMutationGenerateCodeSmsArgs,
  IMutationSignUpClientArgs,
  ISurveyModel,
  IUserTokenDto
} from 'graphql/_server';
import CREATE_SURVEY from 'graphql/mutations/createSurvey';
import GENERATE_CODE_SMS from 'graphql/mutations/generateCodeSms';
import SIGN_UP_CLIENT from 'graphql/mutations/signUpClient';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import projectConstants from 'projectConstants';
import Routes from 'routes';
import useLoading from 'sharedArchitech/hooks/useLoading/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import wait from 'sharedArchitech/utils/wait';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputCode from 'sharedProject/components/inputs/InputCode/InputCode';
import useAuth from 'sharedProject/hooks/useAuth';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';

import Loader from 'components/Loader/Loader';
import WalletWrapper from 'components/Wallet/shared/WalletWrapper/WalletWrapper';

import AuthButtons from '../shared/components/AuthButtons/AuthButtons';

import styles from './styles';

const JoinWalletSmsCode: FC<{ subcompanyId?: number; phone: string; fullName?: string }> = ({
  subcompanyId,
  phone,
  fullName
}) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [signUpClient] = useMutation<{ signUpClient: IUserTokenDto }, IMutationSignUpClientArgs>(
    SIGN_UP_CLIENT
  );

  const { setToken } = useAuth();
  const router = useRouter();
  const [timer, setTimer] = useState(301);
  const [canResendCode, setCanResendCode] = useState(false);

  const [createSurvey] = useMutation<{ createSurvey: ISurveyModel }, IMutationCreateSurveyArgs>(
    CREATE_SURVEY
  );

  const [generateCodeSMS] = useMutation<{ generateCodeSMS: boolean }, IMutationGenerateCodeSmsArgs>(
    GENERATE_CODE_SMS
  );

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<{
    code: string;
    fullName: string;
  }>({
    mode: 'onSubmit',
    defaultValues: {
      code: ''
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
                      Resend code in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                    </Typography>
                  </ButtonUi>
                )}
              </Box>

              <Box pb={3}>
                <Divider light />
              </Box>

              <AuthButtons>
                <>
                  <ButtonUi fullWidth var={EButtonType.Primary} type="submit">
                    Sign In
                  </ButtonUi>
                  <ButtonUi onClick={handleCancel} var={EButtonType.Bordered}>
                    Cancel
                  </ButtonUi>
                </>
              </AuthButtons>
            </>
          </form>
        </Box>
      </WalletWrapper>
    </>
  );

  async function handleCancel() {
    await router.push({
      pathname: Routes.SIGN_UP_WALLET,
      query: {
        phone: phone,
        subcompanyId: subcompanyId
      }
    });
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

  async function onSubmit(inputs: { code: string }) {
    try {
      const loginResponse = await signUpClient({
        variables: {
          payload: {
            code: Number(inputs.code),
            phoneNumber: resolvePhoneNumber(phone),
            fullName: fullName
          }
        }
      });

      if (!loginResponse?.data) {
        throw new Error(projectConstants.messages.error);
      }

      const token = loginResponse?.data?.signUpClient?.token;

      if (!token) {
        throw new Error(projectConstants.messages.error);
      }

      const user = loginResponse?.data?.signUpClient?.user;

      if (!user) {
        throw new Error(projectConstants.messages.error);
      }
      setToken(token);

      await wait(1000);

      if (subcompanyId) {
        const response = await createSurvey({
          variables: {
            payload: {
              subcompanyId: subcompanyId
            }
          }
        });
        if (response) {
          toast('Welcome! Wait for the dispensary to confirm your participation');
        }
      }

      await router.push(Routes.WALLET);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default JoinWalletSmsCode;
