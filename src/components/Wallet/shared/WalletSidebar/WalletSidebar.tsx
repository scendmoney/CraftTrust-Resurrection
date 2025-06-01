import { type FC, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { SwipeableDrawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import styles from './styles';

const WalletSidebar: FC<{ children: ReactElement; close: () => void; open?: boolean }> = ({
  children,
  close,
  open = true
}) => {
  return (
    <SwipeableDrawer
      disableSwipeToOpen
      open={open}
      onClose={close}
      anchor={'bottom'}
      onOpen={() => null}
    >
      <IconButton onClick={close} sx={styles.close}>
        <CloseIcon />
      </IconButton>
      {children}
    </SwipeableDrawer>
  );
};

export default WalletSidebar;
