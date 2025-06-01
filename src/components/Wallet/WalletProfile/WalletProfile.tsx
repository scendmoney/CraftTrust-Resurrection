import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { IMutationUpdateClientArgs, IUserModel } from 'graphql/_server';
import UPDATE_CLIENT from 'graphql/mutations/updateClient';
import projectConstants from 'projectConstants';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import AvatarDropZoneEditor from 'sharedProject/components/AvatarDropZoneEditor/AvatarDropZoneEditor';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useLogout from 'sharedProject/hooks/useLogout';
import base64ToBlob from 'utils/base64ToBlob';
import getNullFileWithPreview from 'utils/getNullFileWithPreview';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const WalletProfile: FC<{ user: IUserModel }> = ({ user }) => {
  const { logout } = useLogout();

  const client = useApolloClient();

  const [updateClient] = useMutation<{ updateClient: IUserModel }, IMutationUpdateClientArgs>(
    UPDATE_CLIENT
  );

  const {
    handleSubmit,
    control,

    reset,

    formState: { isDirty, dirtyFields, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      logo: user?.asset?.url ? getNullFileWithPreview(user?.asset?.url) : undefined,
      fullName: user?.fullName,
      phoneNumber: user?.phoneNumber || ''
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.block}>
        {isLoading ? <Loader /> : null}
        <Typography variant="h2">Profile</Typography>

        <Box>
          <Card elevation={0}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box py={2}>
                <InputLabel sx={styles.label}>Your Photo</InputLabel>
                <Controller
                  control={control}
                  name="logo"
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <AvatarDropZoneEditor
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        width={1024}
                        height={1024}
                        isError={Boolean(errors?.logo?.message)}
                      />
                    );
                  }}
                />
              </Box>
              <Box pb={2}>
                <Controller
                  control={control}
                  name="fullName"
                  rules={validations.requiredText}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <InputText
                        titleText="Your Name"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter Full Name"
                        helperText={errors.fullName?.message || ' '}
                      />
                    );
                  }}
                />
              </Box>
              <Box pb={2}>
                <Controller
                  control={control}
                  name="phoneNumber"
                  rules={validations.phone}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputPhone
                      readOnly
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      titleText="Your Phone"
                      placeholder="Phone #"
                      helperText={errors.phoneNumber?.message}
                    />
                  )}
                />
              </Box>
              <Box py={2}>
                <ButtonUi fullWidth type="submit" disabled={!isDirty}>
                  Submit
                </ButtonUi>
              </Box>
            </form>
          </Card>
        </Box>

        <Box mt={2}>
          <ButtonUi var={EButtonType.Bordered} fullWidth onClick={() => logout()}>
            LOGOUT
          </ButtonUi>
        </Box>
      </Box>
    </Box>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      setIsLoading(true);
      const photo =
        dirtyFields?.logo && inputs?.logo?.preview
          ? await base64ToBlob(inputs?.logo?.preview)
          : undefined;

      if (!user) {
        throw new Error(projectConstants.messages.error);
      }

      await updateClient({
        variables: {
          logo: dirtyFields?.logo ? (photo ? photo : null) : undefined,
          payload: {
            fullName: dirtyFields?.fullName ? inputs.fullName : undefined
          }
        }
      });
      await client.refetchQueries({
        include: ['meClient']
      });
      reset({
        ...inputs
      });
      toast.success('Profile updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }
};

export default WalletProfile;
