import { useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import {
  IMutationCreateInviteArgs,
  IMutationRejectInviteArgs,
  IMutationResendInviteArgs,
  IUserModel
} from 'graphql/_server';
import CREATE_INVITE from 'graphql/mutations/createInvite';
import REJECT_INVITE from 'graphql/mutations/rejectInvite';
import RESEND_INVITE from 'graphql/mutations/resendInvite';
import projectConstants from 'projectConstants';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';

const useInvitesMutations = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const client = useApolloClient();
  const [rejectInvite] = useMutation<{ rejectInvite: IUserModel }, IMutationRejectInviteArgs>(
    REJECT_INVITE
  );
  const [createInvite] = useMutation<{ createInvite: boolean }, IMutationCreateInviteArgs>(
    CREATE_INVITE
  );
  const [resendInvite] = useMutation<{ resendInvite: boolean }, IMutationResendInviteArgs>(
    RESEND_INVITE
  );

  async function handleDeleteInvite(data: IMutationRejectInviteArgs) {
    try {
      setIsLoading(true);

      const response = await rejectInvite({
        variables: data
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Invite removed');

      await client.refetchQueries({
        include: ['invitations']
      });

      return response.data?.rejectInvite;
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateInvite(data: IMutationCreateInviteArgs) {
    try {
      setIsLoading(true);

      const response = await createInvite({
        variables: data
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Invite created');

      await client.refetchQueries({
        include: ['invitations']
      });

      return response.data?.createInvite;
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendInvite(data: IMutationResendInviteArgs) {
    try {
      setIsLoading(true);

      const response = await resendInvite({
        variables: data
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Invite resended');

      await client.refetchQueries({
        include: ['invitations']
      });

      return response.data?.resendInvite;
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading: isLoading,
    rejectInvite: handleDeleteInvite,
    createInvite: handleCreateInvite,
    resendInvite: handleResendInvite
  };
};

export default useInvitesMutations;
