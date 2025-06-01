import { FC, useMemo } from 'react';
import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const SurveySwitchVariantImage: FC<{
  isSelected: boolean;
  label: string;
  onClick: () => void;
  alt?: string;
  img?: string;
}> = ({ isSelected, label, img, alt, onClick }) => {
  const stylesUm = useMemo(() => {
    return styles(isSelected);
  }, [isSelected]);
  return (
    <CardActionArea sx={stylesUm.imgWrapper} onClick={onClick}>
      <Box component={'img'} src={img} sx={stylesUm.thumbnail} alt={alt} />
      <Typography variant="h4" fontSize={16} fontWeight={500} color={colors.gray5}>
        {label}
      </Typography>
    </CardActionArea>
  );
};

export default SurveySwitchVariantImage;
