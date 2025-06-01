import { ComponentType, memo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import styles from './styles';

const SurveyIconFormatter:
  | ComponentType<{
      data: {
        title: string;
        titleShort?: string;
        src: string;
      } | null;
    }>
  | undefined = ({ data }) => {
  if (!data) return null;
  return (
    <Box sx={styles.experience}>
      <Box component={'img'} src={data.src} sx={styles.img} alt={data.title} />
      <Typography variant="body1" fontWeight={500}>
        {data.titleShort ? data.titleShort : data.title}
      </Typography>
    </Box>
  );
};

export default memo(SurveyIconFormatter);
