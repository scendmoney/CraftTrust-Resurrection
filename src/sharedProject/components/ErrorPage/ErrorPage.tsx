import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import ButtonUi from '../ButtonUi/ButtonUi';

import styles from './styles';

const ErrorPage: FC<{ text: string }> = ({ text }) => {
  const router = useRouter();
  return (
    <Box sx={styles.container}>
      <Box component="img" src="/resources/svg/logo.svg" />
      <Typography variant="h3">{text}</Typography>
      <ButtonUi onClick={() => router.push('/')}>Go to main</ButtonUi>
    </Box>
  );
};

export default ErrorPage;
