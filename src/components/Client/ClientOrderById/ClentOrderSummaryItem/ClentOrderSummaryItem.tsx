import { FC, ReactElement, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';

const ClentOrderSummaryItem: FC<{
  label: string;
  icon?: ReactElement;
  avatarSrc?: string | null;
  title?: string | null;
  subtitle?: string | null;
  isIconBordered?: boolean;
}> = ({ label, icon, avatarSrc, title, isIconBordered = false, subtitle }) => {
  const stylesUm = useMemo(() => {
    return styles(isIconBordered);
  }, [isIconBordered]);
  return (
    <Box sx={stylesUm.wrapper}>
      <Typography variant="body2" fontWeight={500} color={colors.gray2}>
        {label}
      </Typography>
      <Box sx={stylesUm.items}>
        {icon && <Box sx={stylesUm.icon}>{icon}</Box>}
        {avatarSrc && <AvatarUncontrolled src={avatarSrc} type={24} />}

        {!avatarSrc && (
          <Typography variant="h4" fontWeight={500}>
            {title || '-'}
          </Typography>
        )}

        {avatarSrc && (
          <Typography variant="subtitle1" fontWeight={500}>
            {title || '-'}
          </Typography>
        )}
      </Box>
      {subtitle && (
        <Typography variant="subtitle1" fontWeight={500} sx={{ color: colors.gray5 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default ClentOrderSummaryItem;
