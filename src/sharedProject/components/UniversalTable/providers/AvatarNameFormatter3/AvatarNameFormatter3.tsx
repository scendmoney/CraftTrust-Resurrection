import { ComponentType, memo, useMemo } from 'react';
import { Badge, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import styles from './styles';

const AvatarNameFormatter3:
  | ComponentType<{
      children?: JSX.Element;
      url: string | undefined | null;
      name: string | undefined | null;
      tooltip?: string | undefined | null;
      avatarSize?: 24 | 48 | 64 | 128 | 192;
      isOnline?: boolean;
    }>
  | undefined = ({ url, children, name, tooltip, avatarSize = 48, isOnline = false }) => {
  const avatarUrlUm = useMemo(() => {
    return url || '/resources/svg/placeholder.svg';
  }, [url]);

  return (
    <Box sx={styles.container}>
      {children ? children : null}
      <Badge
        invisible={!isOnline}
        sx={styles.badge}
        variant="dot"
        color="success"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <AvatarUncontrolled src={avatarUrlUm} type={avatarSize} isGrayBackground />
      </Badge>

      <Tooltip title={tooltip} placement={'bottom'}>
        <Typography variant="body1" fontWeight={500}>
          {name || '--'}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default memo(AvatarNameFormatter3);
