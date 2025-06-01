import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';

const OrderInfoLeftItem: FC<{
  label: string;
  icon?: ReactElement;
  avatarSrc?: string | null;
  title?: string | null;
}> = ({ label, icon, avatarSrc, title }) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="body2" color={colors.gray2}>
        {label}
      </Typography>
      <Box sx={styles.items}>
        {icon && <Box sx={styles.icon}>{icon}</Box>}
        {avatarSrc && <AvatarUncontrolled src={avatarSrc} type={48} />}

        <Typography variant="body1" fontWeight={500}>
          {title || '-'}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderInfoLeftItem;
