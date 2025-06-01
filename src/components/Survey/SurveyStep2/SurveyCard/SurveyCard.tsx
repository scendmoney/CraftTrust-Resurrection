import { FC, ReactElement, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

import styles from './styles';

const SurveyCard: FC<{
  children: ReactElement;
  position?: 'top' | 'middle' | 'back' | 'hidden';
  title: string;
  caption: string;
  currentPage: number;
  totalPages: number;
}> = ({ children, position = 'top', title, caption, currentPage, totalPages }) => {
  const stylesUm = useMemo(() => {
    return styles(position);
  }, [position]);

  return (
    <Box sx={stylesUm.card}>
      <Typography fontSize={12} px={'32px'} variant="h3" color={colors.gray2}>
        {currentPage} / {totalPages}
      </Typography>

      <Box sx={stylesUm.questionTitle}>
        <Typography fontSize={32} variant="h3">
          {title}
        </Typography>
        {caption && (
          <Typography fontSize={16} variant="subtitle1" fontWeight={500} color={colors.gray2}>
            {caption}
          </Typography>
        )}
      </Box>
      <Box sx={stylesUm.children}>{children}</Box>
    </Box>
  );
};

export default SurveyCard;
