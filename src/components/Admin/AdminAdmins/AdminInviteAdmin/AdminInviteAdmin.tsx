import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import { IMutationCreateAdminArgs, UserRoleEnum } from 'graphql/_server';
import CREATE_ADMIN from 'graphql/mutations/createAdmin';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import {
  TModalStateClose,
  TModalStateIsOpen
} from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import InputText from 'sharedProject/components/inputs/InputText/InputText';

import { TInputs } from './types';

const AdminInviteAdmin: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
}> = ({ isOpen, closeModal }) => {
  const client = useApolloClient();
  const [createAdmin] = useMutation<{ createAdmin: boolean }, IMutationCreateAdminArgs>(
    CREATE_ADMIN
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  });

  const { isLoading, startLoading, stopLoading } = useLoading();

  return (
    <DialogUI
      title="Create Admin"
      close={closeModal}
      open={isOpen}
      buttonSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Controller
            control={control}
            name="email"
            rules={validations.requiredEmail}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputText
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                titleText="Admin Email"
                placeholder="Enter Admin Email"
                helperText={errors.email?.message || ' '}
              />
            )}
          />
        </Box>
      </form>
    </DialogUI>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      startLoading();

      const response = await createAdmin({
        variables: {
          payload: {
            role: UserRoleEnum.AdminPlatform,
            email: inputs.email
          }
        }
      });

      if (!response) {
        return null;
      }
      await client.refetchQueries({
        include: ['users']
      });
      toast.success('Admin created!');
      reset();
      closeModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default AdminInviteAdmin;
