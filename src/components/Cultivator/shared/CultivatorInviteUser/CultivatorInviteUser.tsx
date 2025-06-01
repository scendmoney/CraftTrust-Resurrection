import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import { InviteTypeEnum, IUserModel } from 'graphql/_server';
import { ME_USER_SEND_INVITE } from 'graphql/queries/me';
import projectConstants from 'projectConstants';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import {
  TModalStateClose,
  TModalStateIsOpen
} from 'sharedArchitech/hooks/useModalState/useModalState';
import { useReadLocalStorage } from 'sharedArchitech/hooks/useReadLocalStorage';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useInvitesMutations from 'sharedProject/hooks/useInvitesMutations';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';

import { TInputs } from './types';

const CultivatorInviteUser: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
  text?: string;
}> = ({ isOpen, closeModal, text = 'Buyer' }) => {
  const { createInvite } = useInvitesMutations();
  const client = useApolloClient();
  const { data, loading: loadingMe } = useQuery<{ me: IUserModel }>(ME_USER_SEND_INVITE);
  const dataMe = data?.me;
  const isTestMode = useReadLocalStorage<boolean>('testMode');
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: ''
    }
  });

  const { isLoading, startLoading, stopLoading } = useLoading();

  return (
    <DialogUI
      title={`Invite ${text}`}
      close={closeModal}
      open={isOpen}
      buttonSubmit={handleSubmit(onSubmit)}
      isLoading={loadingMe || isLoading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Controller
            control={control}
            name="name"
            rules={validations.requiredText}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputText
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                titleText="Facility Name"
                placeholder="Enter Facility Name"
                helperText={errors.name?.message || ' '}
              />
            )}
          />
        </Box>
        <Box pt={1}>
          <Controller
            control={control}
            name="phoneNumber"
            rules={isTestMode ? undefined : validations.requiredPhone}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputPhone
                isTestMode={isTestMode}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                titleText="SMS Invitation link to"
                placeholder="Enter Mobile Phone Number"
                helperText={errors.phoneNumber?.message || ' '}
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
      const ownerId = dataMe?.userToFacilities?.find((item) => item?.owner?.id === dataMe?.id)?.id;
      if (!ownerId) {
        throw new Error(projectConstants.messages.noAccessError);
      }
      const response = await createInvite({
        payload: {
          isSendSms: false,
          name: inputs.name,
          phone: resolvePhoneNumber(inputs.phoneNumber),
          type: InviteTypeEnum.Buyer
        }
      });
      if (!response) {
        return null;
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      await client.refetchQueries({
        include: ['invitations']
      });
      reset();
      closeModal();
      stopLoading();
    }
  }
};

export default CultivatorInviteUser;
