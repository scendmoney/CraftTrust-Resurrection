import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const PaymentIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 32 32" {...props}>
      <path
        d="M4 25.3333H28M16 16V25.3333M24 16V25.3333M8 16V25.3333M16.4472 4.22361L28.59 10.295C29.4395 10.7197 29.1372 12 28.1875 12H3.81246C2.86276 12 2.56053 10.7197 3.40997 10.295L15.5528 4.22361C15.8343 4.08284 16.1657 4.08284 16.4472 4.22361Z"
        stroke={props.stroke}
        fill="transparent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default PaymentIcon;
