import { FC, memo, useCallback, useMemo, useState } from 'react';
import { ErrorCode, FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';
import UploadMuiIcon from 'resources/iconsMui/UploadMuiIcon';

import ButtonUi from '../ButtonUi/ButtonUi';
import { EButtonType } from '../ButtonUi/types';

import AvatarDropZoneEditorItem from './AvatarDropZoneEditorItem/AvatarDropZoneEditorItem';
import Editor from './Editor/Editor';
import styles from './styles';
import { AssetsDropZoneMuiExtended } from './types';

const AvatarDropZoneEditor: FC<AssetsDropZoneMuiExtended> = ({
  formats = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png']
  },

  maxSize = 10485760,
  isError = false,
  maxFiles = 1,
  isSquare,
  value,
  onChange,
  onBlur,
  addIcon,
  isShowUploadButton = false
}) => {
  const [temporaryFile, setTemporaryFile] = useState<File | ''>('');

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.length > 0 && setTemporaryFile(acceptedFiles[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBlur]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    for (const fileRejection of fileRejections) {
      if (fileRejection?.errors[0].code === ErrorCode.FileTooLarge) {
        toast.error('File too large');
        return;
      }
      if (fileRejection?.errors[0].code === ErrorCode.TooManyFiles) {
        toast.error('Too many files');
        return;
      }
      toast.error(fileRejection?.errors[0].message || 'Some files not loaded');
      return;
    }
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: formats,
    maxFiles: maxFiles,
    multiple: false,
    noClick: true,
    maxSize,
    noKeyboard: true,
    onDropAccepted,
    onDropRejected
  });

  const stylesUm = useMemo(() => {
    return styles(isDragActive, isSquare);
  }, [isDragActive, isSquare]);

  return (
    <>
      <Box sx={stylesUm.container}>
        {!value?.preview ? (
          <>
            <Box
              sx={stylesUm.dropZoneArea}
              {...getRootProps({ className: undefined })}
              style={isError ? { borderColor: 'red' } : undefined}
            >
              <input {...getInputProps()} />

              <IconButton onClick={open} sx={stylesUm.icon} size="large">
                {addIcon ? addIcon : <AddIcon fontSize="large" />}
              </IconButton>
            </Box>
            {isShowUploadButton && (
              <Box sx={stylesUm.buttons}>
                <Typography variant="body2" color={colors.gray2} mb={0.4}>
                  Picture
                </Typography>
                <ButtonUi
                  size="small"
                  startIcon={<UploadMuiIcon />}
                  var={EButtonType.Text}
                  onClick={open}
                >
                  Upload
                </ButtonUi>
              </Box>
            )}
          </>
        ) : (
          <Box>
            <AvatarDropZoneEditorItem
              asset={value}
              removeFile={handleRemoveFile}
              isSquare={isSquare}
            />
          </Box>
        )}
      </Box>
      {Boolean(temporaryFile) && (
        <Editor
          setFile={onChange}
          temporaryFile={temporaryFile}
          setTemporaryFile={setTemporaryFile}
          width={600}
          height={600}
          isSquare={isSquare}
          file={value}
        />
      )}
    </>
  );

  function handleRemoveFile() {
    onChange(null);
  }
};

export default memo(AvatarDropZoneEditor);
