import { FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import Routes from 'routes';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';

import styles from './styles';

const AuthFinalStep: FC<{ redirectTo?: Routes }> = ({ redirectTo }) => {
  const router = useRouter();
  useEffect(() => {
    const timerId = setTimeout(() => {
      handleRedirect();
    }, 3000);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={styles.header}>
        <AuthLogo />
      </Box>

      <AuthBlock isShow>
        <>
          <Box sx={styles.container}>
            <Box component="img" src="/resources/svg/okBig.svg" maxWidth={177} />
            <Typography variant="h4" mb={3} mt={4}>
              Your account has been successfully created
            </Typography>
            <Typography variant="body1" color={colors.gray2}>
              This may take a minute
            </Typography>
          </Box>
        </>
      </AuthBlock>
    </>
  );

  async function handleRedirect() {
    if (redirectTo) {
      await router.push(redirectTo);
    } else {
      await router.push(Routes.CULTIVATOR_INVENTORY);
    }
  }
};

export default AuthFinalStep;
