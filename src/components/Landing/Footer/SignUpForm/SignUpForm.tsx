import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IMutationRequestNewFacilityArgs, RequestFacilityRoleEnum } from 'graphql/_server';
import REQUEST_NEW_FACILITY from 'graphql/mutations/requestNewFacility';
import { colors } from 'mui/theme/colors';
import PlantsIcon from 'resources/iconsMui/PlantsIcon';
import ShopIcon from 'resources/iconsMui/ShopIcon';
import { useReadLocalStorage } from 'sharedArchitech/hooks/useReadLocalStorage';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import wait from 'sharedArchitech/utils/wait';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import resolvePhoneNumber from 'sharedProject/utils/resolvePhoneNumber';

import Loader from 'components/Loader/Loader';

import SuccessNotification from '../shared/SuccessNotification/SuccessNotification';

import SwitchingBlock from './SwitchingBlock/SwitchingBlock';
import styles from './styles';
import { IProps, TInputs } from './types';

const SignUpForm: FC<IProps> = ({ close, open }) => {
  const [step2, setStep2] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<RequestFacilityRoleEnum>(
    RequestFacilityRoleEnum.Cultivator
  );
  const handleBlockClick = (blockId: RequestFacilityRoleEnum) => {
    setSelectedRole(blockId);
  };
  const isTestMode = useReadLocalStorage<boolean>('testMode');
  const [requestNewFacility] = useMutation<
    { requestNewFacility: boolean },
    IMutationRequestNewFacilityArgs
  >(REQUEST_NEW_FACILITY);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      name: '',
      companyName: '',
      email: '',
      olcc: ''
    }
  });

  if (step2) {
    return (
      <SuccessNotification
        open={open}
        close={handleOnClose}
        title={'Your application was submitted'}
        subtitle={`We appreciate your interest to the platform and will notify you once we'll launch`}
      />
    );
  }

  return !step2 ? (
    <Dialog
      sx={styles.dialog}
      open={open}
      onClick={handleOnClose}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(4px)',
            background: '#00000033'
          }
        }
      }}
    >
      <>
        <IconButton sx={styles.close} type="button" onClick={handleOnClose}>
          <CloseIcon />
        </IconButton>
        {loading && <Loader />}
        <Box
          sx={styles.content}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Box sx={styles.header}>
            <Typography variant="h2" fontWeight={400}>
              Sign Up
            </Typography>
          </Box>
          <Box sx={styles.box1}>
            <Box sx={styles.contentTitle}>
              <Typography variant="h4" fontWeight={500}>
                Your Role on a Platform
              </Typography>
              <Typography variant="body2" fontWeight={500} sx={{ color: colors.gray2 }}>
                Please Select One
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid
                item
                sm={6}
                xs={12}
                onClick={() => handleBlockClick(RequestFacilityRoleEnum.Cultivator)}
              >
                <SwitchingBlock
                  title={'Cultivator'}
                  isSelected={selectedRole === RequestFacilityRoleEnum.Cultivator}
                  icon={<PlantsIcon fill={colors.green} />}
                />
              </Grid>
              <Grid
                item
                sm={6}
                xs={12}
                onClick={() => handleBlockClick(RequestFacilityRoleEnum.Buyer)}
              >
                <SwitchingBlock
                  title={'Buyer'}
                  isSelected={selectedRole === RequestFacilityRoleEnum.Buyer}
                  icon={<ShopIcon fill={colors.green} />}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={styles.box2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="companyName"
                rules={validations.requiredText}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputText
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    titleText="Company Name"
                    placeholder="Business Legal Name"
                    helperText={errors.companyName?.message || ' '}
                    required
                  />
                )}
              />
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
                    placeholder="Full Name"
                    helperText={errors.name?.message || ' '}
                    required
                  />
                )}
              />
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
                    titleText="Phone #"
                    placeholder="Phone #"
                    helperText={errors.phoneNumber?.message || ' '}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                rules={validations.requiredEmail}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputText
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    titleText="Email"
                    placeholder="Email"
                    helperText={errors.email?.message || ' '}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="olcc"
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputText
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    titleText="OLCC"
                    placeholder="OLCC"
                  />
                )}
              />
              <div
                className="g-recaptcha"
                data-sitekey={process.env.NEXT_PUBLIC_ENV_RECAPTCHA_KEY}
              ></div>
            </form>

            <Box sx={styles.divider}>
              <Divider />
            </Box>

            <ButtonUi onClick={handleSubmit(onSubmit)} var={EButtonType.Primary}>
              Submit
            </ButtonUi>
          </Box>
        </Box>
      </>
    </Dialog>
  ) : null;

  function handleOnClose(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    close();

    const timerId = setTimeout(() => {
      setStep2(false);
      reset();
      setSelectedRole(RequestFacilityRoleEnum.Cultivator);
    }, 200);

    return () => clearTimeout(timerId);
  }

  async function onSubmit(inputs: TInputs) {
    try {
      setLoading(true);
      if (typeof window !== 'undefined' && window.grecaptcha) {
        const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_ENV_RECAPTCHA_KEY, {
          action: 'submit'
        });
        if (!token) return;
        const response = await requestNewFacility({
          variables: {
            payload: {
              email: inputs.email,
              facilityRole: selectedRole,
              name: inputs.name,
              companyName: inputs.companyName,
              phone: resolvePhoneNumber(inputs.phoneNumber),
              licenseNumber: inputs.olcc
            },
            token: token
          }
        });
        await wait(3000);

        if (!response) return;

        if (response) {
          setStep2(true);
          reset();
        }
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
};

export default SignUpForm;
