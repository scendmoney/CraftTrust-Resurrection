import { ComponentType, memo, useMemo } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { Badge, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ProductStatusEnum } from 'graphql/_server';

import styles from './styles';

const AvatarNameFormatter2: ComponentType<DataTypeProvider.ValueFormatterProps> | undefined = ({
  row
}) => {
  const avatarUrlUm = useMemo(() => {
    return row?.thumbnail?.url || '/resources/svg/placeholder.svg';
  }, [row?.thumbnail]);

  const isInvisible = useMemo(() => {
    return row?.status !== ProductStatusEnum.New;
  }, [row?.status]);

  return (
    <Box sx={styles.container}>
      <Badge
        color="secondary"
        badgeContent=""
        variant="dot"
        invisible={isInvisible}
        sx={styles.badge}
      >
        <Box sx={styles.avatar} component={'img'} src={avatarUrlUm} />
      </Badge>

      <Typography variant="body1" fontWeight={500}>
        {row?.item?.name || '-'}
      </Typography>
    </Box>
  );
};

export default memo(AvatarNameFormatter2);
