import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const UploadMuiIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 2V4H2V2C2 1.73478 2.10536 1.48043 2.29289 1.29289C2.48043 1.10536 2.73478 1 3 1H13C13.2652 1 13.5196 1.10536 13.7071 1.29289C13.8946 1.48043 14 1.73478 14 2V4H13V2H3ZM3.705 9.705L3 9L8 4L13 9L12.295 9.705L8.5 5.915V15H7.5V5.915L3.705 9.705Z"
      />
    </SvgIcon>
  );
};

export default UploadMuiIcon;
