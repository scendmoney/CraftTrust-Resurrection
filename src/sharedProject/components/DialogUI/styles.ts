import { colors } from 'mui/theme/colors';

const styles = (minWidthVw: number, minHeightVh: number, hidePaddings: boolean) => {
  return {
    dialog: {
      '& .MuiBox-root': {
        m: hidePaddings ? 0 : 'initial',
        position: 'relative'
      },
      '& .MuiDialogContent-root': {
        p: hidePaddings ? 0 : 4
      },
      '& .MuiPaper-root': {
        borderRadius: 1,
        minWidth: `${minWidthVw}vw`,
        minHeight: `${minHeightVh}vh`
      }
    },
    title: {
      p: 4,
      pb: 2,
      textAlign: 'center'
    },
    actions: {
      padding: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0.5
    },
    content: {
      padding: 1,
      fontSize: '1rem'
    },
    close: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#fff',
      color: colors.black,
      zIndex: 999
    }
  };
};

export default styles;
