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
  FilterFieldTypeEnum,
  FilterOperationEnum,
  ICompanyModel,
  IMutationUpdateCompanyAdminArgs,
  IProductsModel,
  IQueryProductsAdminArgs
} from 'graphql/_server';
import UPDATE_COMPANY_ADMIN from 'graphql/mutations/updateСompanyAdmin';
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
import preventEnterOnKeyDown from 'utils/preventEnterOnKeyDown';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const AdminPromoCompaniesUpdate: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
  dataCompany: ICompanyModel | undefined;
}> = ({ isOpen, closeModal, dataCompany }) => {
  const client = useApolloClient();
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const selectProductUm: TSelectOptions | undefined = useMemo(() => {
    const item = dataCompany?.productSurvey;
    if (item) {
      return {
        value: item.id,
        label: item.item.name || item.label || 'Unnamed',
        logo: item.thumbnail?.url || ' '
      };
    }
    return undefined;
  }, [dataCompany?.productSurvey]);

  const {
    control,
    handleSubmit,
    watch,
    reset,

    formState: { errors, dirtyFields }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      productStrain: selectProductUm,
      dateEnd: dataCompany?.dateEnd || undefined,
      dateStart: dataCompany?.dateStart || undefined,
      companyName: dataCompany?.companyName,
      unitWeight: dataCompany?.unitWeight
    }
  });

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
            value: [String(dataCompany?.facilityCultivator.id)]
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
    skip: !String(dataCompany?.facilityCultivator.id)
  });

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

  const [updateСompanyAdmin] = useMutation<
    { updatуСompanyAdmin: ICompanyModel },
    IMutationUpdateCompanyAdminArgs
  >(UPDATE_COMPANY_ADMIN);

  return (
    <Dialog sx={styles.dialog} maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeModal}>
      <>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={preventEnterOnKeyDown}>
          {loading ? <Loader animationDelay={0} /> : null}

          <Box sx={styles.block}>
            <DialogTitle sx={styles.title}>
              <Typography variant="h3">{dataCompany?.companyName}</Typography>
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
                    placeholder="Select"
                    value={productStrain?.value ? value : undefined}
                    onBlur={onBlur}
                    loading={loadingProducts}
                    options={facilityProductsUm}
                    onValueChange={onChange}
                    onOptionsSearch={setSearchText}
                    helperText={errors?.productStrain?.message || ' '}
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
              <Box mb={2} mt={1}>
                <Divider />
              </Box>
            </DialogContent>
            <DialogActions sx={styles.actions}>
              <ButtonUi var={EButtonType.Bordered} onClick={closeModal}>
                Cancel
              </ButtonUi>
              <ButtonUi var={EButtonType.Secondary} type="submit">
                Save
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

      await updateСompanyAdmin({
        variables: {
          payload: {
            dateEnd: dirtyFields.dateEnd ? (data?.dateEnd ? data.dateEnd : null) : undefined,
            dateStart: dirtyFields.dateStart ? data.dateStart : undefined,
            id: Number(dataCompany?.id),
            productSurveyId: dirtyFields.productStrain
              ? Number(data?.productStrain?.value)
              : undefined,
            unitWeight: dirtyFields.unitWeight ? Number(data.unitWeight) : undefined,

            companyName: dirtyFields.companyName ? data?.companyName : undefined
          }
        }
      });

      toast.success('Promo Campaign Updated');
      await client.refetchQueries({
        include: ['companyByIdAdmin']
      });
      reset({
        ...data
      });

      closeModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
};

export default AdminPromoCompaniesUpdate;
