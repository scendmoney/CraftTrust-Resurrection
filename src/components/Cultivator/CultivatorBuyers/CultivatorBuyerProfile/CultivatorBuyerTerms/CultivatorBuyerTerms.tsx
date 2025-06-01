import { FC, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { Box, Divider, Fade, Grid, Switch, Typography } from '@mui/material';
import { IFacilityModel, IMutationUpdateBuyerByCultivatorArgs } from 'graphql/_server';
import UPDATE_BUYER_BY_CULTIVATOR from 'graphql/mutations/updateBuyerByCultivator';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import SaveProfilePanel from 'sharedProject/components/profile/SaveProfilePanel/SaveProfilePanel';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const CultivatorBuyerTerms: FC<{ data: IFacilityModel | undefined }> = ({ data }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const client = useApolloClient();

  const dataUm = useMemo(() => {
    return data?.facilityCultivatorRelations ? data?.facilityCultivatorRelations[0] : undefined;
  }, [data?.facilityCultivatorRelations]);

  const defaultValues = useMemo(() => {
    return {
      isNetActivated: data?.facilityCultivatorRelations
        ? data?.facilityCultivatorRelations[0]?.isNetActivated
        : undefined,
      days: data?.facilityCultivatorRelations
        ? data?.facilityCultivatorRelations[0]?.netDays
        : undefined,
      balance: data?.facilityCultivatorRelations
        ? data?.facilityCultivatorRelations[0]?.netBalance
        : undefined
    };
  }, [data?.facilityCultivatorRelations]);

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isDirty, dirtyFields, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: defaultValues
  });

  const isNetActivated = watch('isNetActivated');

  const stylesUm = useMemo(() => {
    return styles(isNetActivated);
  }, [isNetActivated]);

  const [updateBuyerByCultivator] = useMutation<
    { updateBuyerByCultivator: IFacilityModel },
    IMutationUpdateBuyerByCultivatorArgs
  >(UPDATE_BUYER_BY_CULTIVATOR);

  return (
    <Box sx={stylesUm.wrapper}>
      <Box sx={stylesUm.netTerms}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isLoading && <Loader />}

          <Box sx={stylesUm.terms}>
            <Controller
              control={control}
              name="isNetActivated"
              render={({ field: { value, onChange } }) => (
                <Switch
                  color="secondary"
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                />
              )}
            />
            <Typography variant="subtitle1" fontWeight={500}>
              Enable Net Terms
            </Typography>
          </Box>

          {isNetActivated ? (
            <Fade in={isNetActivated} timeout={1000} mountOnEnter unmountOnExit>
              <Box>
                <Divider sx={{ mb: 2, mt: 1 }} />
                <Grid container spacing={2} sx={stylesUm.container}>
                  <Grid item>
                    <Controller
                      control={control}
                      name="days"
                      rules={{
                        required: 'Required',
                        validate: (value) => {
                          const numericValue = Number(value);
                          if (isNaN(numericValue)) {
                            return 'Please enter a valid number.';
                          }

                          if (numericValue < 1 || numericValue > 365) {
                            return 'Enter a number between 1 and 365.';
                          }

                          return true;
                        }
                      }}
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <NumericFormat
                            value={value}
                            onBlur={onBlur}
                            error={Boolean(errors?.days)}
                            customInput={InputText}
                            onChange={onChange}
                            titleText="Days"
                            placeholder="Enter Days"
                            fixedDecimalScale={true}
                            helperText={errors?.days?.message || ' '}
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item sx={stylesUm.divider}>
                    <Divider orientation="vertical" />
                  </Grid>
                  <Grid item>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Required',
                        validate: (value) => {
                          if (isNaN(value)) {
                            return 'Please enter a valid number.';
                          }

                          if (value < 1) {
                            return 'Balance must be greater than $0';
                          }

                          return true;
                        }
                      }}
                      name="balance"
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <NumericFormat
                            value={value}
                            onBlur={onBlur}
                            error={Boolean(errors?.balance)}
                            customInput={InputText}
                            onValueChange={(data) => onChange(data.value)}
                            titleText="Balance"
                            placeholder="Enter Balance"
                            thousandSeparator={true}
                            fixedDecimalScale={true}
                            prefix="$"
                            helperText={errors?.balance?.message || ' '}
                          />
                        );
                      }}
                    />
                  </Grid>
                  {dataUm ? (
                    <Grid item>
                      <NumericFormat
                        value={dataUm.dueBalance}
                        customInput={InputText}
                        titleText="Outstanding balance"
                        thousandSeparator={true}
                        fixedDecimalScale={true}
                        prefix="$"
                        readOnly
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </Box>
            </Fade>
          ) : null}
          <SaveProfilePanel isDirty={isDirty} />
        </form>
      </Box>
    </Box>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      startLoading();
      await updateBuyerByCultivator({
        variables: {
          payload: {
            id: String(data?.id),
            isNetActivated: inputs.isNetActivated,
            netBalance: dirtyFields.balance ? Number(inputs.balance) : undefined,
            netDays: dirtyFields.days ? Number(inputs.days) : undefined
          }
        }
      });
      reset({
        ...inputs
      });
      await client.refetchQueries({
        include: ['facilityById']
      });
      toast.success('Buyer Updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default CultivatorBuyerTerms;
