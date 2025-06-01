import { ComponentType, memo, useMemo } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { getBudColor } from 'sharedProject/components/PromoSurveyDetails/utils/getBudColor';

import styles from './styles';

const ColorFormatter: ComponentType<DataTypeProvider.ValueFormatterProps> | undefined = ({
  value
}) => {
  const budColorUm = useMemo(() => {
    return getBudColor(value);
  }, [value]);
  const stylesUm = useMemo(() => {
    return styles(budColorUm?.color);
  }, [budColorUm?.color]);
  return (
    <Box sx={stylesUm.experience}>
      <Box sx={stylesUm.img} />
      <Typography variant="body1" fontWeight={500}>
        {budColorUm?.title}
      </Typography>
    </Box>
  );
};

export default memo(ColorFormatter);
