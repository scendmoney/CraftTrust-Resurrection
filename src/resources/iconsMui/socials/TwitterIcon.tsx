import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const TwitterIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M12 0C5.37281 0 0 5.37281 0 12C0 18.6272 5.37281 24 12 24C18.6272 24 24 18.6272 24 12C24 5.37281 18.6272 0 12 0Z"
        fill={props.fill}
      />
      <path
        d="M13.313 10.9138L18.45 4.94238H17.2327L12.7722 10.1273L9.20961 4.94238H5.10059L10.4879 12.7829L5.10059 19.0448H6.31797L11.0284 13.5694L14.7907 19.0448H18.8998L13.3127 10.9138H13.313ZM6.75661 5.85882H8.62643L17.2333 18.17H15.3634L6.75661 5.85882Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default TwitterIcon;
