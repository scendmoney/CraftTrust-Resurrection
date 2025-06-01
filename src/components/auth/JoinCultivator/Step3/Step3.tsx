import { FC, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { FacilityRoleEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import Routes from 'routes';
import useMe from 'sharedProject/hooks/useMe';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';
import Loader from 'components/Loader/Loader';

import styles from './styles';

const Step3: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleRedirect();
    }, 7000);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { dataMe, loadingMe } = useMe();

  const avatarUm = useMemo(() => {
    if (dataMe?.context?.asset?.url) {
      return dataMe?.context?.asset?.url;
    }
    return '';
  }, [dataMe]);

  if (loadingMe) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={styles.header}>
        <AuthLogo />
      </Box>

      <AuthBlock isShow>
        <Box sx={styles.container}>
          <Box sx={styles.avatar}>
            <Box component={'img'} sx={styles.avatarImg} src={avatarUm} />
            <Box sx={styles.avatarBackground}>
              <Box sx={styles.avatarFiller} />
            </Box>
          </Box>
          <Typography variant="h4" mb={3} mt={4}>
            Configuring Storefront...
          </Typography>
          <Typography variant="body1" color={colors.gray2}>
            This may take a minute
          </Typography>
        </Box>
      </AuthBlock>
    </>
  );

  async function handleRedirect() {
    if (dataMe?.context?.role === FacilityRoleEnum.Buyer) {
      await router.push(Routes.CLIENT);
    } else {
      await router.push(Routes.CULTIVATOR_INVENTORY);
    }
  }
};

export default Step3;
