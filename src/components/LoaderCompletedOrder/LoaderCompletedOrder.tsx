import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { colors } from 'mui/theme/colors';
import PaymentIcon from 'resources/iconsMui/PaymentIcon';
import PortalHOC from 'sharedArchitech/components/PortalHOC/PortalHOC';

import AuthBlock from 'components/auth/shared/components/AuthBlock/AuthBlock';

import styles from './styles';

const LoaderCompletedOrder: FC<{
  setCompleted: Dispatch<SetStateAction<boolean>>;
}> = ({ setCompleted }) => {
  const [status, setStatus] = useState({
    title: 'Processing...',
    subtitle: 'This may take a minute',
    icon: <PaymentIcon stroke={colors.secondary} sx={styles.avatarImg} />
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(false);
    }, 6000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus({
        title: 'Completed',
        subtitle: 'Now you can Release the Items to Client',
        icon: <DoneIcon sx={styles.avatarImg} htmlColor={colors.secondary} />
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PortalHOC id="portal-2">
      <Backdrop sx={styles.backdrop} open>
        <>
          <AuthBlock isShow>
            <Box sx={styles.container}>
              <Box sx={styles.avatar}>
                {status.icon}
                <Box sx={styles.avatarBackground}>
                  <Box sx={styles.avatarFiller} />
                </Box>
              </Box>
              <Typography variant="h4" fontWeight={500} color={colors.black1}>
                {status.title}
              </Typography>
              <Typography variant="body1" color={colors.gray2}>
                {status.subtitle}
              </Typography>
            </Box>
          </AuthBlock>
        </>
      </Backdrop>
    </PortalHOC>
  );
};

export default LoaderCompletedOrder;
