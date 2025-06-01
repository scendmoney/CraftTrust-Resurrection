import { FC, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import styles from './styles';

const AvatarUncontrolled: FC<{
  src: string | undefined | null;
  variant?: 'circular' | 'rounded' | 'square';
  type?: 24 | 32 | 48 | 64 | 128 | 192 | 256;
  isHideBackground?: boolean;
  isGrayBackground?: boolean;
  isAddBorder?: boolean;
  tooltip?: string;
}> = ({
  src,
  variant = 'circular',
  type = 64,
  isHideBackground = false,
  isGrayBackground = false,
  isAddBorder = false,
  tooltip = undefined
}) => {
  const stylesUm = useMemo(() => {
    return styles(type, isHideBackground, isGrayBackground, isAddBorder);
  }, [type, isHideBackground, isGrayBackground, isAddBorder]);
  const imgSrc = src && src.length > 1 ? src : '/resources/svg/placeholder.svg';
  return (
    <Tooltip title={tooltip} placement="bottom" hidden={!tooltip} arrow>
      <Avatar draggable={false} src={imgSrc} variant={variant} sx={stylesUm.avatar} />
    </Tooltip>
  );
};
export default AvatarUncontrolled;
