import { FC, ReactElement, useMemo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const ClientCheckoutSwitchingBlock: FC<{
  isSelected: boolean;
  title: string;
  subtitle?: string;
  freeLabel?: boolean;
  icon: ReactElement;
  disabled?: boolean;
}> = ({ isSelected, title, subtitle, freeLabel, icon, disabled = false }) => {
  const stylesUm = useMemo(() => {
    return styles(isSelected, disabled);
  }, [isSelected, disabled]);
  return (
    <Box sx={stylesUm.wrapper}>
      <Box sx={stylesUm.deliveryIcon}>{icon}</Box>
      <Box sx={stylesUm.titleWrapper}>
        <Typography variant="h4" fontWeight={500} sx={stylesUm.title}>
          {title}
        </Typography>
        {freeLabel && (
          <Typography variant="h4" fontWeight={500} sx={{ color: colors.secondary }}>
            Free
          </Typography>
        )}
      </Box>
      {subtitle && (
        <Typography variant="subtitle1" fontWeight={500} sx={stylesUm.subtitle}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default ClientCheckoutSwitchingBlock;
