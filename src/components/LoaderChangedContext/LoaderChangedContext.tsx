import { FC, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { FacilityRoleEnum, IFacilityModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';
import AuthLogo from 'components/auth/shared/components/AuthLogo/AuthLogo';

import styles from './styles';

const LoaderChangedContext: FC<{ isOpen?: boolean; facility: IFacilityModel }> = ({
  isOpen = true,
  facility
}) => {
  const avatarUm = useMemo(() => {
    if (facility.asset?.url) {
      return facility.asset?.url;
    }
    return '/resources/placeholder.png';
  }, [facility.asset?.url]);

  const facilityRoleUm = useMemo(() => {
    if (facility.role === FacilityRoleEnum.Cultivator || facility.role === FacilityRoleEnum.Buyer) {
      return capitalizeFirstLetter(facility.role);
    }
    if (facility.role === FacilityRoleEnum.BuyerAndCultivator) {
      return 'Buyer and Cultivator';
    }
  }, [facility.role]);

  return (
    <Backdrop sx={styles.backdrop} open={isOpen}>
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
            <Typography variant="h4" fontWeight={500} color={colors.black1}>
              Logging in as {facility.displayName}
            </Typography>
            <Typography variant="body1" color={colors.gray2}>
              You will be redirected to {facilityRoleUm} Workspace
            </Typography>
          </Box>
        </AuthBlock>
      </>
    </Backdrop>
  );
};

export default LoaderChangedContext;
