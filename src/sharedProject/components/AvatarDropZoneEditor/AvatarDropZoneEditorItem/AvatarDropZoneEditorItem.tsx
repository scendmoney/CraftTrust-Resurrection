import { FC, useMemo } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';

import styles from './styles';
import IProps from './types';

const AvatarDropZoneEditorItem: FC<IProps> = ({ asset, removeFile, isSquare }) => {
  const assetUm = useMemo(() => {
    return <img src={asset?.preview || '/resources/placeholder.png'} alt="Image" loading="lazy" />;
  }, [asset]);
  const stylesUm = useMemo(() => {
    return styles(isSquare);
  }, [isSquare]);

  return (
    <Grow in timeout={750} mountOnEnter unmountOnExit>
      <Box sx={stylesUm.block}>
        <Box sx={stylesUm.assetContainer}>{assetUm}</Box>

        <Box sx={stylesUm.cover}>
          <IconButton sx={stylesUm.icon} onClick={handleRemove}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Box>
    </Grow>
  );

  function handleRemove() {
    removeFile(asset);
  }
};

export default AvatarDropZoneEditorItem;
