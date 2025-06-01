import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './styles';

const Answer: FC<{
  data: {
    title: string;
    src: string;
  } | null;
}> = ({ data }) => {
  if (!data) return null;
  return (
    <Box sx={styles.experience}>
      <Box component={'img'} src={data.src} sx={styles.img} alt={data.title} />
      <Typography variant="body1" fontWeight={500}>
        {data.title}
      </Typography>
    </Box>
  );
};

export default Answer;
