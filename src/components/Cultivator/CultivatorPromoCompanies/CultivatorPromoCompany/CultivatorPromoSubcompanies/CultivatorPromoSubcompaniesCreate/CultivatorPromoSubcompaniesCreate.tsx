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
  IMutationCreateSubcompanyCultivatorArgs,
  IQueryBuyersArgs,
  ISubcompanyModel
} from 'graphql/_server';
import CREATE_SUBCOMPANY_CULTIVATOR from 'graphql/mutations/createSubcompanyCultivator';
import BUYERS from 'graphql/queries/buyers';
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

const CultivatorPromoSubcompaniesCreate: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
  facilities: ISubcompanyModel[] | undefined;
}> = ({ isOpen, closeModal, facilities }) => {
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

  const { data, loading } = useQuery<{ buyers: IFacilitiesDto }, IQueryBuyersArgs>(BUYERS, {
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
  });

  const facilityUsersUm: TSelectOptions[] = useMemo(() => {
    const items = data?.buyers.items;
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
  }, [data?.buyers.items]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const [createSubcompanyCultivator] = useMutation<
    { createSubcompanyCultivator: ISubcompanyModel },
    IMutationCreateSubcompanyCultivatorArgs
  >(CREATE_SUBCOMPANY_CULTIVATOR);

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
                      isAllowed={(values) => {
                        return (values?.floatValue || 0) >= 0;
                      }}
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
      await createSubcompanyCultivator({
        variables: {
          payload: {
            companyId: Number(id),
            facilityBuyerId: String(data.facility?.value),
            quantity: Number(data.reward)
          }
        }
      });
      await client.refetchQueries({
        include: ['subcompaniesCultivator', 'companyByIdCultivator']
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

export default CultivatorPromoSubcompaniesCreate;
