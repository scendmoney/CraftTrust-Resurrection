import { FC, memo, ReactElement, useEffect } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { colors } from 'mui/theme/colors';

import PortalHOC from '../PortalHOC/PortalHOC';

import styles from './styles';

const EnlargeImage: FC<{ image: string; closeHandler: () => void; open: boolean }> = ({
  image,
  closeHandler,
  open
}): ReactElement | null => {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && closeHandler();
    });
    return () => {
      document.removeEventListener('keydown', (e) => e);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) {
    return null;
  }

  return (
    <PortalHOC id="portal-2">
      <>
        <Backdrop
          sx={{ zIndex: 10000, backgroundColor: '#000000dd' }}
          open={open}
          onClick={closeHandler}
        />
        <IconButton onClick={closeHandler} sx={styles.close} size="large">
          <CloseIcon htmlColor={colors.black} fontSize="large" />
        </IconButton>
        <Box sx={styles.window}>
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut }) => (
              <>
                <Box sx={styles.transformComponent}>
                  <TransformComponent>
                    <img src={image} alt="image" style={{ maxHeight: '95vh' }} />
                  </TransformComponent>
                </Box>
                <Box sx={styles.buttons}>
                  <IconButton onClick={() => zoomOut()}>
                    <RemoveIcon htmlColor={colors.black} />
                  </IconButton>

                  <IconButton onClick={() => zoomIn()}>
                    <AddOutlinedIcon htmlColor={colors.black} />
                  </IconButton>
                </Box>
              </>
            )}
          </TransformWrapper>
        </Box>
      </>
    </PortalHOC>
  );
};

export default memo(EnlargeImage);
