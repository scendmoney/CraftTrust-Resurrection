import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { Divider, Fade, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  IMutationUpdateProductArgs,
  IProductModel,
  IUpdateProductDto,
  ProductStatusEnum
} from 'graphql/_server';
import UPDATE_PRODUCT from 'graphql/mutations/updateProduct';
import { useRouter } from 'next/router';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import AvatarDropZoneEditor from 'sharedProject/components/AvatarDropZoneEditor/AvatarDropZoneEditor';
import InputSelect from 'sharedProject/components/inputs/InputSelect/InputSelect';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import SaveProfilePanel from 'sharedProject/components/profile/SaveProfilePanel/SaveProfilePanel';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import base64ToBlob from 'utils/base64ToBlob';
import getNullFileWithPreview from 'utils/getNullFileWithPreview';
import roundToQuarter from 'utils/roundToQuarter';

import Loader from 'components/Loader/Loader';

import { minQtyMap } from './helpers/minQty';
import ProductInfo from './ProductInfo/ProductInfo';
import ProductMetrcData from './ProductMetrcData/ProductMetrcData';
import ProductTerpenesSelector from './ProductTerpenesSelector/ProductTerpenesSelector';
import styles from './styles';
import { TInputs } from './types';
import validations from './validations';

const CultivatorInventoryProduct: FC<{ product: IProductModel }> = ({ product }) => {
  const client = useApolloClient();
  const router = useRouter();
  const { clearQuery } = useProjectRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const productId = nextRouterQueryCheckId(router.query.id);

  const {
    handleSubmit,
    control,

    getValues,
    setValue,
    formState: { isDirty, dirtyFields, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      status: product?.status,
      price: String(product?.price),
      quantityStock: product?.quantityStock,
      minQty: String(product?.quantityStockMin) || '0.25',
      description: product?.description || '',
      geneticCross: product?.geneticCross || '',
      thumbnail: product?.thumbnail?.url
        ? getNullFileWithPreview(String(product?.thumbnail.url))
        : undefined,
      terpenes: product?.terpenes || []
    }
  });

  const enumStatusMap = Object.entries(ProductStatusEnum).map(([key, value]) => ({
    value,
    label: key
  }));

  const [updateProduct] = useMutation<
    { updateProduct: IUpdateProductDto },
    IMutationUpdateProductArgs
  >(UPDATE_PRODUCT);

  return (
    <>
      {isLoading && <Loader />}
      <Fade in timeout={1000}>
        <Box sx={styles.wrapper}>
          <Box sx={styles.productWrapper}>
            <Box>
              <Controller
                control={control}
                name="thumbnail"
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <AvatarDropZoneEditor
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      width={1024}
                      height={1024}
                      isSquare
                      isError={Boolean(errors?.thumbnail?.message)}
                    />
                  );
                }}
              />
            </Box>
            <ProductInfo product={product} />
          </Box>

          <Box sx={styles.storeFrontWrapper}>
            <Typography variant="h3" fontWeight={500}>
              Storefront
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={styles.storeFormWrapper}>
                <Box>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <InputSelect
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          options={enumStatusMap}
                        />
                      );
                    }}
                  />
                </Box>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Controller
                      control={control}
                      name="price"
                      rules={validations.price}
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <NumericFormat
                            customInput={InputText}
                            titleText="Price for 1/4 lb"
                            thousandSeparator={true}
                            thousandsGroupStyle="thousand"
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            fullWidth
                            prefix="$"
                            onBlur={onBlur}
                            onValueChange={(data) => onChange(data.value)}
                            placeholder="Enter Price"
                            value={value}
                            error={Boolean(errors?.price)}
                            helperText={errors?.price?.message}
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Controller
                      control={control}
                      name="minQty"
                      rules={validations.minQty}
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <InputSelect
                            titleText="Min QTY for Order"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            options={minQtyMap}
                            error={Boolean(errors?.minQty)}
                            helperText={errors?.minQty?.message}
                          />
                        );
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <InputText
                      fullWidth
                      titleText="Quantity in Metrc"
                      value={`${product.quantity} lb`}
                      placeholder="-"
                      readOnly
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Controller
                      control={control}
                      name="quantityStock"
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <NumericFormat
                            customInput={InputText}
                            titleText="Quantity in Stock"
                            thousandSeparator={true}
                            thousandsGroupStyle="thousand"
                            decimalSeparator="."
                            decimalScale={2}
                            fullWidth
                            suffix=" lb"
                            onBlur={() => {
                              handleOnBlur(getValues('quantityStock'), 0, product.quantity);
                              onBlur();
                            }}
                            onValueChange={(data) => onChange(data.value)}
                            placeholder="Enter Price"
                            value={value}
                            error={Boolean(errors?.price)}
                            helperText={errors?.quantityStock?.message}
                          />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Typography variant="subtitle1" fontWeight={500}>
                  Additional Info
                </Typography>
                <Controller
                  control={control}
                  name="geneticCross"
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <InputText
                        titleText="Genetic Cross"
                        placeholder="Genetic Cross"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <InputText
                        titleText="Description"
                        placeholder="Enter Description"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        multiline
                        maxRows={5}
                        minRows={3}
                      />
                    );
                  }}
                />
                <Box>
                  <Controller
                    control={control}
                    name="terpenes"
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ProductTerpenesSelector
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      );
                    }}
                  />
                </Box>

                <SaveProfilePanel isDirty={isDirty} />
                <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
              </Box>
            </form>
          </Box>
          <ProductMetrcData product={product} />
        </Box>
      </Fade>
    </>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      startLoading();
      const photo =
        dirtyFields?.thumbnail && inputs?.thumbnail?.preview
          ? await base64ToBlob(inputs?.thumbnail?.preview)
          : undefined;

      await updateProduct({
        variables: {
          thumbnail: dirtyFields?.thumbnail ? (photo ? photo : null) : undefined,
          payload: {
            description: getValues('description') ? inputs.description : null,
            geneticCross: getValues('geneticCross') ? inputs.geneticCross : null,
            status: dirtyFields.status ? inputs.status : undefined,
            price: dirtyFields.price ? Number(inputs.price) : undefined,
            quantityStockMin: dirtyFields.minQty ? Number(inputs.minQty) : undefined,
            quantityStock: dirtyFields.quantityStock ? Number(inputs.quantityStock) : undefined,
            id: Number(productId),
            terpenes: dirtyFields?.terpenes
              ? inputs.terpenes
              : inputs.terpenes?.length === 0
              ? null
              : undefined
          }
        }
      });
      await client.refetchQueries({
        include: ['productsCultivator']
      });
      await clearQuery();
      toast.success('Product updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }

  function handleOnBlur(value: number, min: number, max: number) {
    const result = roundToQuarter(value, min, max);
    setValue('quantityStock', result);
  }
};

export default CultivatorInventoryProduct;
