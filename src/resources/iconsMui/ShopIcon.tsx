import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ShopIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 49 48" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.5 16.5H42.5V19.5H8.3L10.85 36H23V39H10.85C9.35 39 8 37.95 7.85 36.45L5 18.3V18C5 17.1 5.6 16.5 6.5 16.5H15.5V10.5C15.5 7.95 17.45 6 20 6H29C31.55 6 33.5 7.95 33.5 10.5V16.5ZM20 9C19.1 9 18.5 9.6 18.5 10.5V16.5H30.5V10.5C30.5 9.6 29.9 9 29 9H20ZM26 31.5V25.5H32V31.5H26ZM42.5 36H36.5V42H42.5V36ZM42.5 25.5H36.5V31.5H42.5V25.5ZM32 36H26V42H32V36Z"
        fill={props.fill}
      />
    </SvgIcon>
  );
};

export default ShopIcon;
