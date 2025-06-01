import { FC } from 'react';
import { Divider, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import useMe from 'sharedProject/hooks/useMe';

import Loader from 'components/Loader/Loader';

import ClientCultivators from './ClientCultivators/ClientCultivators';
import ClientProducts from './ClientProducts/ClientProducts';
import styles from './styles';

const Client: FC = () => {
  const { dataMe, loadingMe } = useMe();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loadingMe) {
    return <Loader animationDelay={0} />;
  }

  return (
    <Box sx={styles.wrapper} key={dataMe?.context?.id}>
      {!isMobile && (
        <>
          <ClientCultivators />
          <Box mt={4} mb={3}>
            <Divider />
          </Box>
        </>
      )}
      <ClientProducts showCultivatorFilters />
    </Box>
  );
};

export default Client;
