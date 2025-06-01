import { FC } from 'react';
import { Box, CardActionArea, Typography } from '@mui/material';
import { colors } from 'mui/theme/colors';
import router from 'next/router';
import truncateText from 'sharedArchitech/utils/truncateText';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';
import IProps from './types';

const Suggestion: FC<IProps> = ({ id, title, logoUrl, close, facility }) => {
  return (
    <CardActionArea sx={styles.cardAction} onClick={() => handleItemClick(id)}>
      <Box sx={styles.titleWrapper}>
        <AvatarUncontrolled type={48} variant="rounded" src={logoUrl} isGrayBackground />
        <Typography variant="body1" fontWeight={500}>
          {truncateText(title, 60)}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight={500} sx={{ color: colors.gray5 }}>
        {facility}
      </Typography>
    </CardActionArea>
  );
  async function handleItemClick(id: number) {
    router.push({
      pathname: `/client/products/${id}`
    });
    close();
  }
};

export default Suggestion;
