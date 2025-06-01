import { colors } from 'mui/theme/colors';

const styles = (isOnlyDatesEdit: boolean) => {
  return {
    dialog: {
      '& .MuiDialog-container': {
        backdropFilter: 'blur(4px)!important',
        height: '100%'
      },
      '& .MuiDialogContent-root': {
        px: 6,
        '@media only screen and (max-width: 600px)': {
          px: 4
        },
        py: isOnlyDatesEdit ? 2 : 0,
        overflowY: 'auto',
        maxHeight: '70vh'
      },
      '& .MuiDialog-paper': {
        background: 'transparent',
        maxWidth: {
          xs: '100%',
          sm: '70vw',
          md: '50vw',
          lg: '35vw'
        },
        borderRadius: 0
      }
    },
    close: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#fff',
      color: colors.black
    },
    actions: {
      px: 6,
      '@media only screen and (max-width: 600px)': {
        px: 4
      },
      pb: 6,
      pt: 2,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',

      gridGap: 1
    },
    title: {
      px: 6,
      '@media only screen and (max-width: 600px)': {
        px: 4
      },
      pt: 6
    },
    block: {
      backgroundColor: colors.white,
      borderRadius: '12px',
      position: 'relative'
    },
    dates: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 1,
      '@media only screen and (max-width: 768px)': {
        gridTemplateColumns: '1fr'
      }
    }
  };
};

export default styles;
