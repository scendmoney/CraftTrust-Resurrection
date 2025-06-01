import { FC } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ResearchIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 32 32" {...props}>
      <path
        d="M20.0008 11.0007V0.937908H12.0006V11.0007L3.35709 28.3501C2.73376 29.5969 3.64035 31.0637 5.0342 31.0637H26.9672C28.361 31.0637 29.2676 29.5969 28.6443 28.3501L20.0008 11.0007Z"
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.0005 0.937744H22.0008H10.0005Z" fill={props.fill} />
      <path
        d="M10.0005 0.937744H22.0008"
        stroke={props.stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0006 25.0012C14.0006 26.1058 13.1051 27.0012 12.0005 27.0012C10.896 27.0012 10.0005 26.1058 10.0005 25.0012C10.0005 23.8966 10.896 23.0011 12.0005 23.0011C13.1051 23.0011 14.0006 23.8966 14.0006 25.0012Z"
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0006 18.5009C18.0006 19.6055 17.1051 20.501 16.0005 20.501C14.896 20.501 14.0005 19.6055 14.0005 18.5009C14.0005 17.3963 14.896 16.5009 16.0005 16.5009C17.1051 16.5009 18.0006 17.3963 18.0006 18.5009Z"
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.0006 18.501H8.25049H14.0006Z" fill={props.fill} />
      <path
        d="M14.0006 18.501H8.25049"
        stroke={props.stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M23.7511 18.501H18.001H23.7511Z" fill={props.fill} />
      <path
        d="M23.7511 18.501H18.001"
        stroke={props.stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default ResearchIcon;
