import { FC } from 'react';
import { useMediaQuery } from '@mui/material';

import { ILandingRefs } from '../Landing';

import LayoutClientHeaderMobile from './LayoutClientHeaderMobile/LayoutClientHeaderMobile';
import LayoutLandingtHeaderDesktop from './LayoutLandingHeaderDesktop/LayoutLandingtHeaderDesktop';

const LayoutLandingHeader: FC<{ refs: ILandingRefs }> = ({ refs }) => {
  const isMobile = useMediaQuery('(max-width:1050px)');
  if (isMobile) {
    return <LayoutClientHeaderMobile refs={refs} />;
  }
  return <LayoutLandingtHeaderDesktop refs={refs} />;
};

export default LayoutLandingHeader;
