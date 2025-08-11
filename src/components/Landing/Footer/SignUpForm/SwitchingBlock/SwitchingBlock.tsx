import { FC, ReactElement, useMemo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import styles from './styles';

const SwitchingBlock: FC<{
  title: string;
  isSelected: boolean;
  icon: ReactElement;
}> = ({ title, isSelected, icon }) => {
  const stylesUm = useMemo(() => {
    return styles(isSelected);
  }, [isSelected]);
  return (
    <Box sx={stylesUm.wrapper}>
      <Box sx={stylesUm.deliveryIcon}>{icon}</Box>
      <Box sx={stylesUm.titleWrapper}>
        <Typography variant="h4" fontWeight={500} sx={stylesUm.title}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default SwitchingBlock;