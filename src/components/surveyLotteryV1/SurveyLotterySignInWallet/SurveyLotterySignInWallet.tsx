import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import validations from 'sharedArchitech/validations';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';

import SurveyLoutteryLayout from '../SurveyLoutteryLayout/SurveyLoutteryLayout';

import styles from './styles';

interface FormValues {
  [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SurveyLotterySignInWallet: FC<{ uuid: string }> = ({ uuid }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange'
  });

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const words = [
    'word1',
    'word2',
    'word3',
    'word4',
    'word5',
    'word6',
    'word7',
    'word8',
    'word9',
    'word10',
    'word11',
    'word12'
  ];

  return (
    <SurveyLoutteryLayout>
      <>
        <Typography variant="h3">Please enter your mnemonic phrase</Typography>
        <Typography variant="body1">
          Earlier you copied your 12 word sentence. Please enter these words to access your NFT
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} mb={3}>
            {words.map((item, index) => {
              return (
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} key={item}>
                  <Controller
                    control={control}
                    name={item}
                    rules={validations.requiredText}
                    render={({ field }) => (
                      <InputBase
                        {...field}
                        sx={styles.input}
                        type="text"
                        autoComplete="off"
                        startAdornment={
                          <InputAdornment position="start">{index + 1}.</InputAdornment>
                        }
                        error={!!errors[item]}
                        fullWidth
                        inputProps={{ 'aria-label': item }}
                      />
                    )}
                  />
                  {/* {errors[fieldName] && <span>{(errors[fieldName] as any).message}</span>} */}
                </Grid>
              );
            })}
          </Grid>
        </form>

        <ButtonUi type="submit" fullWidth>
          Sign In
        </ButtonUi>
      </>
    </SurveyLoutteryLayout>
  );
};

export default SurveyLotterySignInWallet;
