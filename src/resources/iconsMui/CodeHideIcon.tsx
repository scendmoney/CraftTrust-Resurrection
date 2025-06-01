import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CodeHideIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5605 1.5L22.5 21.4395L21.4395 22.5L12.3878 13.4482L10.7662 19.5L9.31725 19.1115L11.163 12.2235L6.90525 7.96575L2.871 12L7.0605 16.1895L6 17.25L0.75 12L5.84475 6.90525L1.5 2.5605L2.5605 1.5ZM13.2848 10.1032L14.682 4.8885L13.2338 4.5L12.06 8.8785L13.2848 10.1032ZM18.1552 14.9738L19.2157 16.0343L23.25 12L18 6.75L16.9395 7.8105L21.129 12L18.1552 14.9738Z"
        fill={props.fill}
      />
    </SvgIcon>
  );
};

export default CodeHideIcon;
