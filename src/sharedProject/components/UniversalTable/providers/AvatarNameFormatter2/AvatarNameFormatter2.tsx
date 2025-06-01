import { ComponentType, memo, useMemo } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import styles from './styles';

const AvatarNameFormatter:
  | ComponentType<{ url: string | undefined | null; name: string | undefined | null }>
  | undefined = ({ url, name }) => {
  const avatarUrlUm = useMemo(() => {
    return url || '/resources/svg/placeholder.svg';
  }, [url]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.avatar} component={'img'} src={avatarUrlUm} />

      <Typography variant="body1" fontWeight={500}>
        {name || '--'}
      </Typography>
    </Box>
  );
};

export default memo(AvatarNameFormatter);
