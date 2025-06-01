import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const WalletIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 49 48" {...props}>
      <path
        d="M6.33325 12V37C6.33325 38.6569 7.6764 40 9.33325 40H41.3333C41.8855 40 42.3333 39.5523 42.3333 39V32M38.3333 16H8.33325C7.22868 16 6.33325 15.1046 6.33325 14V10C6.33325 8.89543 7.22868 8 8.33325 8H37.3333C37.8855 8 38.3333 8.44772 38.3333 9V16ZM38.3333 16H41.3333C41.8855 16 42.3333 16.4477 42.3333 17V24M42.3333 24H34.3333C33.2287 24 32.3333 24.8954 32.3333 26V30C32.3333 31.1046 33.2287 32 34.3333 32H42.3333M42.3333 24V32"
        stroke={props.stroke}
        fill="transparent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default WalletIcon;
