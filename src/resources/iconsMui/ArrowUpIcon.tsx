import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ArrowUpIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 8 4" {...props}>
      <path d="M0 4L4 0L8 4H0Z" fill={props.fill} />
    </SvgIcon>
  );
};

export default ArrowUpIcon;
