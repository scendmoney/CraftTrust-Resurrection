import { colors } from 'mui/theme/colors';

const styles = (isSquare?: boolean) => {
  return {
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .MuiModal-backdrop': {
        background: 'rgb(0 0 0 / 50%)',
        backdropFilter: 'blur(4px)'
      }
    },
    canvas: {
      '> canvas': {
        maxHeight: 'auto',
        maxWidth: '100%',
        objectFit: 'cover',
        borderRadius: isSquare ? '12px' : '50%',

        '@media only screen and (max-width: 768px)': {
          maxWidth: '90vw',
          maxHeight: '90vw'
        }
      }
    },
    backdrop: {
      background: 'rgb(0 0 0 / 50%)',
      backdropFilter: 'blur(4px)'
    },
    buttons: {
      display: 'flex',
      position: 'absolute',
      bottom: '2vh',
      left: 0,
      right: 0,

      justifyContent: 'center',
      alignItems: 'center',
      gap: 1,
      color: colors.white
    }
  };
};
export default styles;
