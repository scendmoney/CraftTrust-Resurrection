import { FC, ReactElement, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const ProductInfoLeftItem: FC<{
  label: string;
  icon?: ReactElement;
  whiteBackground?: boolean;
  title?: string | null;
}> = ({ label, icon, whiteBackground = false, title }) => {
  const stylesUm = useMemo(() => {
    return styles(whiteBackground);
  }, [whiteBackground]);
  return (
    <Box sx={stylesUm.wrapper}>
      <Box sx={stylesUm.icon}>{icon}</Box>

      <Box sx={stylesUm.items}>
        <Typography variant="body2" color={colors.gray2}>
          {label}
        </Typography>

        <Typography variant="body1" fontWeight={500}>
          {title || '-'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductInfoLeftItem;
