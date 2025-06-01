import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import {
  IFacilityModel,
  IMutationUpdateAdminProfileArgs,
  IMutationUpdateFacilityArgs,
  IMutationUpdateUserArgs,
  IUserModel
} from 'graphql/_server';
import UPDATE_ADMIN_PROFILE from 'graphql/mutations/updateAdminProfile';
import UPDATE_FACILITY from 'graphql/mutations/updateFacility';
import UPDATE_USER from 'graphql/mutations/updateUser';
import projectConstants from 'projectConstants';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';

const useProfileMutations = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [updateFacility] = useMutation<
    { updateFacility: IFacilityModel },
    IMutationUpdateFacilityArgs
  >(UPDATE_FACILITY);

  const [updateUser] = useMutation<{ updateUser: IUserModel }, IMutationUpdateUserArgs>(
    UPDATE_USER
  );

  const [updateAdminProfile] = useMutation<
    { updateAdminProfile: IUserModel },
    IMutationUpdateAdminProfileArgs
  >(UPDATE_ADMIN_PROFILE);

  async function handleUpdateFacility(data: IMutationUpdateFacilityArgs) {
    try {
      setIsLoading(true);

      const response = await updateFacility({
        variables: data
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Profile successfully updated');
      return response.data?.updateFacility;
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateUser(data: IMutationUpdateUserArgs) {
    try {
      setIsLoading(true);

      const response = await updateUser({
        variables: data
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Profile successfully updated');
      return response.data?.updateUser;
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateAdminProfile(data: IMutationUpdateAdminProfileArgs) {
    try {
      setIsLoading(true);

      const response = await updateAdminProfile({
        variables: data
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Profile successfully updated');
      return response.data?.updateAdminProfile;
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    updateFacility: handleUpdateFacility,
    updateUser: handleUpdateUser,
    updateAdminProfile: handleUpdateAdminProfile
  };
};

export default useProfileMutations;
