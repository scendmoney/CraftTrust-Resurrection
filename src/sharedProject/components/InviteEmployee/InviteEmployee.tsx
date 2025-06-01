import { FC, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApolloClient, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import {
  FacilityRoleEnum,
  FilterFieldTypeEnum,
  FilterOperationEnum,
  InviteTypeEnum,
  IQueryEmployeesArgs,
  IUsersModelDto,
  SortDirectionEnum
} from 'graphql/_server';
import EMPLOYEES from 'graphql/queries/employees';
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
import InputSelect from 'sharedProject/components/inputs/InputSelect/InputSelect';
import { TSelectOptions } from 'sharedProject/components/inputs/InputSelect/types';
import useInvitesMutations from 'sharedProject/hooks/useInvitesMutations';
import useMe from 'sharedProject/hooks/useMe';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';

import InputText from '../inputs/InputText/InputText';

import { TInputs } from './types';

const InviteEmployee: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
  from: 'buyer' | 'cultivator';
}> = ({ isOpen, closeModal }) => {
  const client = useApolloClient();
  const { dataMe, loadingMe } = useMe();

  const facilityUm = useMemo(() => {
    return dataMe?.context;
  }, [dataMe]);
  const isTestMode = useReadLocalStorage<boolean>('testMode');
  const isBuyer = dataMe?.context?.role === FacilityRoleEnum.Buyer;
  const { createInvite } = useInvitesMutations();

  const [facilityMetrcUsers, setFacilityMetrcUsers] = useState<TSelectOptions[]>([]);

  useQuery<{ employees: IUsersModelDto }, IQueryEmployeesArgs>(EMPLOYEES, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'email',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Null,
            value: ['']
          }
        ],
        sorts: [
          {
            columnName: 'fullName',
            direction: SortDirectionEnum.Desc
          }
        ],
        paginate: {
          skip: 0,
          take: 120
        }
      }
    },
    skip: !facilityUm?.id,
    onCompleted: (data) => {
      setFacilityMetrcUsers(
        data.employees.items.map((item) => {
          return {
            value: item.id,
            label: item.fullName || item.email || 'Unnamed User',
            logo: item.asset?.url || ' '
          };
        })
      );
    }
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      id: '',
      phoneNumber: ''
    }
  });

  const { isLoading, startLoading, stopLoading } = useLoading();

  return (
    <DialogUI
      title={`Invite Employee`}
      close={closeModal}
      open={isOpen}
      buttonSubmit={handleSubmit(onSubmit)}
      isLoading={loadingMe || isLoading}
    >
      <form>
        {!isBuyer ? (
          <Box mb={2}>
            <Controller
              control={control}
              name="id"
              rules={validations.required}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <InputSelect
                    titleText="Select"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={facilityMetrcUsers}
                  />
                );
              }}
            />
          </Box>
        ) : (
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
                  titleText="Full Name"
                  placeholder="Enter Employee Name"
                  helperText={errors.name?.message || ' '}
                />
              )}
            />
          </Box>
        )}
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

      if (!facilityUm?.id) {
        throw new Error(projectConstants.messages.noAccessError);
      }
      const response = await createInvite({
        payload: {
          employeeId: isBuyer ? undefined : inputs.id,
          isSendSms: false,
          phone: resolvePhoneNumber(inputs.phoneNumber),
          type: InviteTypeEnum.Employee,
          name: isBuyer
            ? inputs.name
            : facilityMetrcUsers.find((item) => item.value === inputs.id)?.label || 'Employee'
        }
      });

      if (!response) {
        return null;
      }

      await client.refetchQueries({
        include: ['invitations']
      });
      reset();
      closeModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default InviteEmployee;
