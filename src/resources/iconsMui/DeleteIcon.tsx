import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const DeleteIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 25" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2H15V3.5H9V2ZM3 5V6.5H4.5V21.5C4.5 21.8978 4.65804 22.2794 4.93934 22.5607C5.22064 22.842 5.60218 23 6 23H18C18.3978 23 18.7794 22.842 19.0607 22.5607C19.342 22.2794 19.5 21.8978 19.5 21.5V6.5H21V5H3ZM6 21.5V6.5H18V21.5H6ZM9 9.5H10.5V18.5H9V9.5ZM13.5 9.5H15V18.5H13.5V9.5Z"
        fill="#9B9B9B"
      />
    </SvgIcon>
  );
};

export default DeleteIcon;
