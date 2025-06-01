import { ComponentType, memo } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { getAromaImg } from 'sharedProject/components/PromoSurveyDetails/utils/getAromaImg';

import styles from './styles';

const SurveySmellIconFormatter:
  | ComponentType<{
      data: number[];
    }>
  | undefined = ({ data }) => {
  if (!data) return null;
  return (
    <Box sx={styles.experience}>
      {data?.map((item) => (
        <Tooltip key={item} title={getAromaImg(item)?.title} placement={'bottom'}>
          <Box component={'img'} src={getAromaImg(item)?.src} sx={styles.img} alt={String(item)} />
        </Tooltip>
      ))}
    </Box>
  );
};

export default memo(SurveySmellIconFormatter);
