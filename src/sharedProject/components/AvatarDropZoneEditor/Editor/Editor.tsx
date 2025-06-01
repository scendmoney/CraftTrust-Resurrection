import { FC, memo, ReactElement, useMemo, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import { Box, IconButton, Modal } from '@mui/material';
import Button from '@mui/material/Button';

import stylesMui from './stylesMui';
import { IProps } from './types';

const Editor: FC<IProps> = ({
  setFile,

  temporaryFile,
  setTemporaryFile,

  width,
  height,
  isSquare
}): ReactElement | null => {
  const editor = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);

  const stylesUm = useMemo(() => {
    return stylesMui(isSquare);
  }, [isSquare]);

  return (
    <>
      <Modal sx={stylesUm.modal} open onClose={() => setTemporaryFile('')}>
        <>
          <Box sx={stylesUm.canvas}>
            <AvatarEditor
              ref={editor}
              width={width}
              height={height}
              backgroundColor="white"
              color={[0, 0, 0, 0.8]}
              image={temporaryFile}
              rotate={rotate}
              scale={scale}
              border={0}
              borderRadius={isSquare ? 0 : 1000}
            />
            <Box sx={stylesUm.buttons}>
              <Button onClick={closeHandler} variant="outlined" color="inherit" disableElevation>
                Cancel
              </Button>

              <IconButton onClick={rotateHandler} color="inherit">
                <Rotate90DegreesCwOutlinedIcon />
              </IconButton>

              <IconButton onClick={unScaleHandler} color="inherit">
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>

              <IconButton onClick={scaleHandler} color="inherit">
                <ControlPointOutlinedIcon />
              </IconButton>

              <Button onClick={addImageNewToObject} variant="contained" disableElevation>
                Save
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </>
  );

  async function addImageNewToObject() {
    try {
      if (!editor || !editor.current) {
        throw new Error('Editor is not defined');
      }

      const data = editor.current.getImageScaledToCanvas().toDataURL('image/png');

      if (temporaryFile) {
        const newFile = { ...temporaryFile, preview: data };

        setFile(newFile);

        setTemporaryFile('');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error');
    }
  }

  function scaleHandler() {
    setScale(scale + 0.2);
  }

  function unScaleHandler() {
    if (scale > 1) {
      setScale(scale - 0.2);
    }
  }

  function rotateHandler() {
    setRotate(rotate + 90);
  }

  function closeHandler() {
    setFile(undefined);
    setTemporaryFile('');
  }
};

export default memo(Editor);
