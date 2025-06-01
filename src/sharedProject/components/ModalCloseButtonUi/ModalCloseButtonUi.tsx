import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import styles from './styles';

const ModalCloseButtonUi: FC<{ onClose: () => void; zIndex?: number }> = ({
  onClose,
  zIndex = 100001
}) => {
  return (
    <IconButton color="inherit" sx={{ ...styles.close, zIndex }} type="button" onClick={onClose}>
      <CloseIcon color="inherit" />
    </IconButton>
  );
};

export default ModalCloseButtonUi;
