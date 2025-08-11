import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { IMutationRecoveryPasswordArgs, IUserTokenDto } from 'graphql/_server';
import RECOVERY_PASSWORD from 'graphql/mutations/recoveryPassword';
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

import AuthButtons from '../shared/components/AuthButtons/AuthButtons';
import AuthWrapper from '../shared/components/AuthWrapper/AuthWrapper';

import styles from './styles';

const ForgotPassword: FC<{ code: string }> = ({ code }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { setToken } = useAuth();
  const router = useRouter();

  const [recoveryPassword] = useMutation<
    { recoveryPassword: IUserTokenDto },
    IMutationRecoveryPasswordArgs
  >(RECOVERY_PASSWORD);

  const {
    handleSubmit,
    control,

    formState: { errors }
  } = useForm<{ password: string }>({
    mode: 'onChange',
    defaultValues: {
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <Typography variant="h4" color={colors.secondary} mb={2}>
                  Set a new password
                </Typography>

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
                      autoComplete="new-password"
                      onChange={onChange}
                      onBlur={onBlur}
                      titleText="Password"
                      helperText={errors.password?.message || ' '}
                      required
                    />
                  )}
                />

                <AuthButtons>
                  <>
                    <ButtonUi fullWidth var={EButtonType.Primary} type="submit">
                      Confirm
                    </ButtonUi>
                    <ButtonUi var={EButtonType.Gray} onClick={handleGoToPhoneAuth}>
                      Cancel
                    </ButtonUi>
                  </>
                </AuthButtons>
              </>
            </form>
          </AuthBlock>
        </>
      </AuthWrapper>
    </>
  );

  async function handleGoToPhoneAuth() {
    await router.push(Routes.SIGN_IN_PHONE);
  }

  async function onSubmit(inputs: { password: string }) {
    try {
      startLoading();

      if (!code) {
        throw new Error(projectConstants.messages.error);
      }

      const response = await recoveryPassword({
        variables: {
          payload: {
            password: inputs.password,
            codeRecoveryPassword: code
          }
        }
      });

      if (response) {
        setToken('');
        router.push(Routes.SIGN_IN);
      } else {
        throw new Error(projectConstants.messages.error);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default ForgotPassword;
