import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const SortDirectionDownIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5605 15.4395L13.5 16.5L18 21L22.5 16.5L21.4395 15.4395L18.75 18.129V3H17.25V18.129L14.5605 15.4395ZM1.5 13.5H12V15H1.5V13.5ZM12 9H4.5V10.5H12V9ZM7.5 4.5H12V6H7.5V4.5Z"
      />
    </SvgIcon>
  );
};

export default SortDirectionDownIcon;
