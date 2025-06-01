import { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  FacilityRoleEnum,
  FilterFieldTypeEnum,
  FilterOperationEnum,
  ICompanyModel,
  IFacilitiesDto,
  IMutationCreateCompanyAdminArgs,
  IProductsModel,
  IQueryFacilitiesArgs,
  IQueryProductsAdminArgs
} from 'graphql/_server';
import CREATE_COMPANY_ADMIN from 'graphql/mutations/createCompanyAdmin';
import FACILITIES from 'graphql/queries/facilities';
import PRODUCTS_ADMIN from 'graphql/queries/productsAdmin';
import {
  TModalStateClose,
  TModalStateIsOpen
} from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import { InputDate } from 'sharedProject/components/inputs/InputDate/InputDate';
import { TSelectOptions } from 'sharedProject/components/inputs/InputSelect/types';
import InputSelectManyWithSearch from 'sharedProject/components/inputs/InputSelectManyWithSearch/InputSelectManyWithSearch';
import InputSelectWithSearch from 'sharedProject/components/inputs/InputSelectWithSearch/InputSelectWithSearch';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import preventEnterOnKeyDown from 'utils/preventEnterOnKeyDown';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const AdminPromoCompaniesCreate: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
}> = ({ isOpen, closeModal }) => {
  const { goToModal } = useProjectRouter();
  const client = useApolloClient();
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,

    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      cultivator: undefined,

      productStrain: undefined,
      dateEnd: undefined,
      dateStart: undefined,
      companyName: undefined,
      unitWeight: undefined
    }
  });

  const { data, loading: loadingFacilities } = useQuery<
    { facilities: IFacilitiesDto },
    IQueryFacilitiesArgs
  >(FACILITIES, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'role',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: [FacilityRoleEnum.Cultivator, FacilityRoleEnum.BuyerAndCultivator]
          },
          {
            columnName: 'displayName',
            operation: FilterOperationEnum.Contains,
            type: FilterFieldTypeEnum.Text,
            value: [searchText]
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

  const cultivatorForm = watch('cultivator');

  const productStrain = watch('productStrain');

  const { data: productsData, loading: loadingProducts } = useQuery<
    { productsAdmin: IProductsModel },
    IQueryProductsAdminArgs
  >(PRODUCTS_ADMIN, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'facility.id',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: [`${cultivatorForm?.value}`]
          },
          {
            columnName: 'quantityStock',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Number,
            value: [`0`]
          },
          {
            columnName: 'item.name',
            operation: FilterOperationEnum.Contains,
            type: FilterFieldTypeEnum.Text,
            value: [searchText]
          }
        ]
      }
    },
    skip: !cultivatorForm?.value
  });

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

  const facilityProductsUm: TSelectOptions[] = useMemo(() => {
    const items = productsData?.productsAdmin?.items;
    if (items) {
      return items.map((item) => {
        return {
          value: item.id,
          label: item.item.name || item.label || 'Unnamed',
          logo: item.thumbnail?.url || ' '
        };
      });
    }
    return [];
  }, [productsData?.productsAdmin?.items]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (!cultivatorForm) {
      setValue('productStrain', undefined);
    }
  }, [cultivatorForm, setValue]);

  const [createCompanyAdmin] = useMutation<
    { createCompanyAdmin: ICompanyModel },
    IMutationCreateCompanyAdminArgs
  >(CREATE_COMPANY_ADMIN);

  return (
    <Dialog sx={styles.dialog} maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeModal}>
      <>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={preventEnterOnKeyDown}>
          {loading ? <Loader animationDelay={0} /> : null}

          <Box sx={styles.block}>
            <DialogTitle sx={styles.title}>
              <Typography variant="h3">New Campaign</Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
              <IconButton sx={styles.close} type="button" onClick={closeModal} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
              <Controller
                control={control}
                name="companyName"
                rules={validations.required}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputText
                    titleText="Campaign Name"
                    placeholder="Enter Campaign Name"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    helperText={errors?.companyName?.message || ' '}
                    required
                    invalid={Boolean(errors?.companyName)}
                  />
                )}
              />
              <Controller
                control={control}
                name="cultivator"
                rules={validations.required}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputSelectWithSearch
                    titleText="Campaign Cultivator"
                    onBlur={onBlur}
                    loading={loadingFacilities}
                    options={facilityUsersUm}
                    onValueChange={onChange}
                    onOptionsSearch={setSearchText}
                    helperText={errors?.cultivator?.message || ' '}
                    value={cultivatorForm?.value ? value : undefined}
                    invalid={Boolean(errors?.cultivator)}
                    required
                  />
                )}
              />
              <Box sx={styles.dates}>
                <Controller
                  control={control}
                  name="dateStart"
                  rules={validations.required}
                  render={({ field: { value, onChange } }) => (
                    <InputDate
                      titleText="Start"
                      value={value}
                      onValueChange={onChange}
                      disablePast
                      helperText={errors.dateStart?.message}
                      placeholder="Start"
                      required
                      invalid={Boolean(errors?.dateStart)}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="dateEnd"
                  render={({ field: { value, onChange } }) => (
                    <InputDate
                      titleText="End"
                      value={value}
                      onValueChange={onChange}
                      disablePast
                      placeholder="Sold Out"
                      helperText={errors.dateEnd?.message}
                    />
                  )}
                />
              </Box>
              <Box my={2}>
                <Divider />
              </Box>

              <Controller
                control={control}
                name="productStrain"
                rules={validations.required}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputSelectWithSearch
                    titleText="Campaign Strain"
                    placeholder={cultivatorForm ? 'Select' : 'Select cultivator first'}
                    value={productStrain?.value ? value : undefined}
                    onBlur={onBlur}
                    loading={loadingProducts}
                    options={facilityProductsUm}
                    onValueChange={onChange}
                    onOptionsSearch={setSearchText}
                    helperText={errors?.productStrain?.message || ' '}
                    readOnly={!cultivatorForm}
                    required
                    invalid={Boolean(errors?.productStrain)}
                  />
                )}
              />
              <Box sx={{ width: '50%' }}>
                <Controller
                  control={control}
                  name="unitWeight"
                  rules={{
                    required: 'Required',
                    validate: (value) => {
                      if (value <= 0) {
                        return 'Please enter a value greater than 0';
                      }
                      return true;
                    }
                  }}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <NumericFormat
                        titleText="Pack size"
                        value={value}
                        onBlur={onBlur}
                        error={Boolean(errors?.unitWeight)}
                        customInput={InputText}
                        onValueChange={(data) => onChange(data.value)}
                        placeholder="1 g"
                        thousandSeparator={true}
                        fixedDecimalScale={true}
                        suffix=" g"
                        helperText={errors?.unitWeight?.message || ' '}
                        required
                        invalid={Boolean(errors?.unitWeight)}
                      />
                    );
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={styles.actions}>
              <ButtonUi var={EButtonType.Bordered} onClick={closeModal}>
                Cancel
              </ButtonUi>
              <ButtonUi var={EButtonType.Secondary} type="submit">
                Create
              </ButtonUi>
            </DialogActions>
          </Box>
        </form>
      </>
    </Dialog>
  );

  async function onSubmit(data: TInputs) {
    try {
      setLoading(true);
      if (!data.cultivator?.value) {
        throw new Error('Wrong Cultivator');
      }
      if (typeof data.cultivator.value !== 'string') {
        throw new Error('Wrong Cultivator');
      }
      if (!data?.productStrain) {
        throw new Error('Wrong Campaign Strain');
      }
      if (!data?.companyName) {
        throw new Error('Wrong Campaign Name');
      }

      const response = await createCompanyAdmin({
        variables: {
          payload: {
            dateEnd: data?.dateEnd ? data.dateEnd : undefined,
            dateStart: data.dateStart,
            facilityCultivatorId: data.cultivator.value,
            productSurveyId: Number(data.productStrain.value),
            companyName: data.companyName,
            unitWeight: Number(data.unitWeight)
          }
        }
      });

      toast.success('Promo Campaign Created');
      await client.refetchQueries({
        include: ['companiesAdmin']
      });

      reset();
      closeModal();
      await goToModal({ id: Number(response.data?.createCompanyAdmin.id) });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
};

export default AdminPromoCompaniesCreate;
