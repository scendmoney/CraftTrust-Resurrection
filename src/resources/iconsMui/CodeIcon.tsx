import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CodeIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.31388 19.1127L13.2292 4.5007L14.6781 4.88893L10.7628 19.501L9.31388 19.1127ZM0.75 12L6 6.75L7.0575 7.8075L2.8725 12L7.0575 16.1925L6 17.25L0.75 12ZM23.25 12L18 17.25L16.9425 16.1925L21.1275 12L16.9425 7.8075L18 6.75L23.25 12Z"
        fill={props.fill}
      />
    </SvgIcon>
  );
};

export default CodeIcon;
