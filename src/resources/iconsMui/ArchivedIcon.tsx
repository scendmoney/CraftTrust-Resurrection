import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ArchivedIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 21V1.5H19.5V21C19.5 21.3978 19.342 21.7794 19.0607 22.0607C18.7794 22.342 18.3978 22.5 18 22.5H6C5.60218 22.5 5.22064 22.342 4.93934 22.0607C4.65804 21.7794 4.5 21.3978 4.5 21ZM6 21H18V12H6V21ZM6 10.5H18V7.5H6V10.5ZM6 3V6H18V3H6ZM10.5 14.25H13.5V15.75H10.5V14.25Z"
        fill={props.fill}
      />
    </SvgIcon>
  );
};

export default ArchivedIcon;
