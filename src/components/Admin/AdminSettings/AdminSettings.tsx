import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Divider, Grid, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  ConfigurationTypesEnum,
  IMutationUpdateConfigurationArgs,
  UserRoleEnum
} from 'graphql/_server';
import UPDATE_CONFIGURATIONS from 'graphql/mutations/updateConfiguration';
import projectConstants from 'projectConstants';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import SaveProfilePanel from 'sharedProject/components/profile/SaveProfilePanel/SaveProfilePanel';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const AdminSettings: FC<{
  data:
    | {
        configurations: {
          commissionOrderBuyer: number;
          commissionOrderCultivator: number;
        };
      }
    | undefined;
  role: UserRoleEnum;
}> = ({ data, role }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width:999px)');
  const {
    handleSubmit,
    control,
    reset,

    formState: { errors, isDirty, dirtyFields }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      cultivator: data?.configurations.commissionOrderCultivator,
      buyer: data?.configurations.commissionOrderBuyer
    }
  });
  const [updateConfiguration] = useMutation<
    { updateConfiguration: JSON },
    IMutationUpdateConfigurationArgs
  >(UPDATE_CONFIGURATIONS);

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={{ ml: isMobile ? 1 : 0 }}>
        Platform Settings
      </Typography>

      <Divider light />

      <Typography variant="subtitle1" fontWeight={'bold'}>
        Commission Rates
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitNew)}>
        {isLoading && <Loader />}
        <Grid container spacing={2} mb={3}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Controller
              control={control}
              rules={{
                required: 'Required',
                validate: (value) => {
                  if (value > 100 || value < 0) {
                    return 'Please enter a number between 0 and 100';
                  }
                  return true;
                }
              }}
              name="cultivator"
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <NumericFormat
                    value={value}
                    onBlur={onBlur}
                    error={Boolean(errors?.cultivator)}
                    customInput={InputText}
                    onValueChange={(data) => {
                      onChange(data.value);
                    }}
                    titleText="Cultivator Commission"
                    placeholder="5 %"
                    fixedDecimalScale={true}
                    suffix=" %"
                    helperText={errors?.cultivator?.message || ' '}
                    readOnly={role !== UserRoleEnum.OwnerPlatform}
                  />
                );
              }}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Controller
              control={control}
              rules={{
                required: 'Required',
                validate: (value) => {
                  if (value > 100 || value < 0) {
                    return 'Please enter a number between 0 and 100';
                  }
                  return true;
                }
              }}
              name="buyer"
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <NumericFormat
                    value={value}
                    onBlur={onBlur}
                    error={Boolean(errors?.buyer)}
                    customInput={InputText}
                    onValueChange={(data) => {
                      onChange(data.value);
                    }}
                    titleText="Buyer Commission"
                    placeholder="5 %"
                    fixedDecimalScale={true}
                    suffix=" %"
                    helperText={errors?.buyer?.message || ' '}
                    readOnly={role !== UserRoleEnum.OwnerPlatform}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <SaveProfilePanel isDirty={isDirty} />
      </form>
    </Box>
  );

  function handleSubmitNew(inputs: TInputs) {
    if (dirtyFields.buyer && !dirtyFields.cultivator) {
      onSubmit(ConfigurationTypesEnum.CommissionOrderBuyer, inputs);
    } else if (!dirtyFields.buyer && dirtyFields.cultivator) {
      onSubmit(ConfigurationTypesEnum.CommissionOrderCultivator, inputs);
    } else if (dirtyFields.buyer && dirtyFields.cultivator) {
      onSubmit(ConfigurationTypesEnum.CommissionOrderBuyer, inputs);
      onSubmit(ConfigurationTypesEnum.CommissionOrderCultivator, inputs);
    }
  }

  async function onSubmit(type: ConfigurationTypesEnum, inputs: TInputs) {
    try {
      setIsLoading(true);

      const response = await updateConfiguration({
        variables: {
          payload: {
            type: type,
            value:
              type === ConfigurationTypesEnum.CommissionOrderBuyer
                ? String(inputs.buyer)
                : String(inputs.cultivator)
          }
        }
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      reset({
        ...inputs
      });
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      setIsLoading(false);
    }
  }
};

export default AdminSettings;
