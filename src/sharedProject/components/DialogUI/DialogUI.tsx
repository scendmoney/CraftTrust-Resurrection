import { FC, useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Loader from 'components/Loader/Loader';

import ButtonUi from '../ButtonUi/ButtonUi';
import { EButtonType } from '../ButtonUi/types';

import styles from './styles';
import { IProps } from './types';

const DialogUI: FC<IProps> = ({
  isLoading,
  children,
  title,

  hideCloseButton = false,

  minWidthVw = 30,
  minHeightVh = 5,
  hidePaddings = false,
  hideButtons = false,
  buttonSubmit,
  buttonSubmitText,

  buttonSubmit2,
  buttonSubmitText2,

  close,
  buttonCancelText,
  ...rest
}) => {
  const stylesUm = useMemo(() => {
    return styles(minWidthVw, minHeightVh, hidePaddings);
  }, [minWidthVw, minHeightVh, hidePaddings]);
  return (
    <Dialog maxWidth="sm" fullWidth={true} sx={stylesUm.dialog} onClose={handleOnClose} {...rest}>
      {isLoading && <Loader animationDelay={0} />}
      <Box
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {!hideCloseButton && (
          <IconButton sx={stylesUm.close} type="button" onClick={handleOnClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        {title && (
          <DialogTitle sx={stylesUm.title} variant="h3">
            {title}
          </DialogTitle>
        )}
        <DialogContent sx={stylesUm.content}>
          <Box>{children}</Box>
        </DialogContent>

        {!hideButtons ? (
          <Box px={4}>
            <Divider />
          </Box>
        ) : null}

        {!hideButtons ? (
          <DialogActions sx={stylesUm.actions}>
            <ButtonUi var={EButtonType.Bordered} onClick={handleOnClose} fullWidth>
              {buttonCancelText || 'Cancel'}
            </ButtonUi>
            {buttonSubmit2 && (
              <ButtonUi onClick={handleOnSubmit2} var={EButtonType.Bordered} fullWidth>
                {buttonSubmitText2 || 'Submit'}
              </ButtonUi>
            )}
            {buttonSubmit && (
              <ButtonUi onClick={handleOnSubmit} var={EButtonType.Secondary} fullWidth>
                {buttonSubmitText || 'Submit'}
              </ButtonUi>
            )}
          </DialogActions>
        ) : null}
      </Box>
    </Dialog>
  );

  function handleOnSubmit(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (buttonSubmit) {
      buttonSubmit();
    }
  }

  function handleOnSubmit2(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (buttonSubmit2) {
      buttonSubmit2();
    }
  }

  function handleOnClose(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (close) {
      close();
    }
  }
};

export default DialogUI;
