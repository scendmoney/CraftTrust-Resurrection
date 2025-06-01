import { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IFacilitiesDto,
  IMutationCreateSubcompanyAdminArgs,
  IQueryFacilitiesArgs,
  ISubcompanyModel
} from 'graphql/_server';
import CREATE_SUBCOMPANY_ADMIN from 'graphql/mutations/createSubcompanyAdmin';
import { FACILITIES_FOR_SUBCOMPANIES_SEARCH } from 'graphql/queries/facilities';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import {
  TModalStateClose,
  TModalStateIsOpen
} from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import { TSelectOptions } from 'sharedProject/components/inputs/InputSelect/types';
import InputSelectWithSearch from 'sharedProject/components/inputs/InputSelectWithSearch/InputSelectWithSearch';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const AdminPromoSubcompaniesCreate: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
  facilityId: string | undefined;
  facilities: ISubcompanyModel[] | undefined;
}> = ({ isOpen, closeModal, facilityId, facilities }) => {
  const client = useApolloClient();
  const selectedFacilitiesId = facilities?.length
    ? facilities.map((item) => item?.facilityBuyer?.id ?? '')
    : [''];

  const { id } = useProjectRouter();
  const [searchText, setSearchText] = useState<string>('');
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      facility: undefined,
      reward: undefined
    }
  });

  const { data, loading } = useQuery<{ facilities: IFacilitiesDto }, IQueryFacilitiesArgs>(
    FACILITIES_FOR_SUBCOMPANIES_SEARCH,
    {
      variables: {
        payload: {
          filters: [
            {
              columnName: 'displayName',
              operation: FilterOperationEnum.Contains,
              type: FilterFieldTypeEnum.Text,
              value: [searchText]
            },
            {
              columnName: 'facilityCultivatorRelations.facilityCultivator.id',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: [String(facilityId)]
            },
            {
              columnName: 'id',
              operation: FilterOperationEnum.NotEqual,
              type: FilterFieldTypeEnum.Text,
              value: selectedFacilitiesId
            }
          ],
          paginate: {
            skip: 0,
            take: 10
          }
        }
      },
      skip: !isOpen
    }
  );

  const facilityUsersUm: TSelectOptions[] = useMemo(() => {
    const items = data?.facilities?.items;
    if (items) {
      return items.map((item) => {
        return {
          value: item.id,
          label: item.displayName || item.name || 'Unnamed',
          logo: item.asset?.url || ' '
        };
      });
    }
    return [];
  }, [data?.facilities?.items]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const [createSubcompanyAdmin] = useMutation<
    { createSubcompanyAdmin: ISubcompanyModel },
    IMutationCreateSubcompanyAdminArgs
  >(CREATE_SUBCOMPANY_ADMIN);

  return (
    <Dialog sx={styles.dialog} maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeModal}>
      <>
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styles.block}>
            <DialogTitle mt={1} sx={styles.title}>
              <Typography variant="h3">Add Dispensary</Typography>
            </DialogTitle>
            <DialogContent>
              <Controller
                control={control}
                name="facility"
                rules={validations.required}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputSelectWithSearch
                    titleText="Dispensary"
                    value={value}
                    onBlur={onBlur}
                    loading={loading}
                    options={facilityUsersUm}
                    onValueChange={onChange}
                    onOptionsSearch={setSearchText}
                  />
                )}
              />
              <Box my={3}>
                <Divider />
              </Box>
              <Controller
                control={control}
                name="reward"
                rules={{
                  required: 'Required'
                }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <NumericFormat
                      value={value}
                      onBlur={onBlur}
                      error={Boolean(errors?.reward)}
                      customInput={InputText}
                      onValueChange={(data) => onChange(data.value)}
                      titleText="Reward Units"
                      placeholder="0 units"
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      suffix=" units"
                      helperText={errors?.reward?.message || ' '}
                    />
                  );
                }}
              />
            </DialogContent>

            <Box px={4}>
              <Divider />
            </Box>
            <DialogActions sx={styles.actions}>
              <ButtonUi var={EButtonType.Bordered} onClick={closeModal}>
                Cancel
              </ButtonUi>

              <ButtonUi type="submit" var={EButtonType.Secondary}>
                Add
              </ButtonUi>
            </DialogActions>
          </Box>
        </form>
      </>
    </Dialog>
  );

  async function onSubmit(data: TInputs) {
    try {
      startLoading();
      await createSubcompanyAdmin({
        variables: {
          payload: {
            companyId: Number(id),
            facilityBuyerId: String(data.facility?.value),
            quantity: Number(data.reward)
          }
        }
      });
      await client.refetchQueries({
        include: ['subcompaniesAdmin', 'companyByIdAdmin']
      });
      toast.success('Dispensary Added');
      reset();
      closeModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default AdminPromoSubcompaniesCreate;
