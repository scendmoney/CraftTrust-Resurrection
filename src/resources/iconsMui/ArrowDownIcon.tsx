import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ArrowDownIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 8 4" {...props}>
      <path d="M0 0L4 4L8 0H0Z" fill={props.fill} />
    </SvgIcon>
  );
};

export default ArrowDownIcon;
