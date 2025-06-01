import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IMutationSendContactUsArgs } from 'graphql/_server';
import SEND_CONTACT_US from 'graphql/mutations/sendContactUs';
import { resolve } from 'path';
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

import styles from './styles';
import { IProps, TInputs } from './types';

const ContactUsForm: FC<IProps> = ({ close, open }) => {
  const [step2, setStep2] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [sendContactUs] = useMutation<{ sendContactUs: boolean }, IMutationSendContactUsArgs>(
    SEND_CONTACT_US
  );

  const isTestMode = useReadLocalStorage<boolean>('testMode');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      companyName: '',
      name: '',
      email: '',
      message: ''
    }
  });

  if (step2) {
    return (
      <SuccessNotification
        open={open}
        close={handleOnClose}
        title={'Your message was submitted'}
        subtitle={'We will contact you shortly'}
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
              Contact Us
            </Typography>
          </Box>
          <Box sx={styles.box}>
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
                name="phoneNumber"
                rules={validations.requiredPhone}
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
                name="message"
                rules={validations.required}
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputText
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    titleText="Message"
                    placeholder="Message"
                    multiline
                    minRows={2}
                    maxRows={3}
                    required
                    helperText={errors.message?.message || ' '}
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
        const response = await sendContactUs({
          variables: {
            payload: {
              email: inputs.email,
              message: inputs.message,
              companyName: inputs.companyName,
              name: inputs.name,
              phone: resolvePhoneNumber(inputs.phoneNumber)
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

export default ContactUsForm;
