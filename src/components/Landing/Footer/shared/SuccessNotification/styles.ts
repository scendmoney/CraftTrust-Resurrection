import { colors } from 'mui/theme/colors';

const styles = {
  dialog: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,

    '& .MuiDialog-paper': {
      backgroundColor: 'transparent',
      borderRadius: 0,
      maxHeight: '100vh',
      maxWidth: {
        xs: '80vw',
        sm: 'clamp(450px, 35vw, 2500px)'
      },
      margin: 0
    },

    '& .MuiBox-root': {
      m: 0,
      position: 'relative',
      '::-webkit-scrollbar': {
        display: 'none'
      }
    },
    '& .MuiDialogContent-root': {
      p: 0
    }
  },
  success: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    backgroundColor: colors.black1,
    color: colors.white,
    p: 'clamp(16px, 2.68vw, 480px)',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 3
  },
  close: {
    borderRadius: '100px',
    px: 'clamp(10px, 1.34vw, 24px)',
    py: '16px',
    backgroundColor: colors.black1,
    color: colors.white,
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 10001,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: colors.black
    },
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  subtitle: {
    width: 'clamp(330px, 18.5vw, 2000px)',
    opacity: 0.5,
    '@media only screen and (max-width: 400px)': {
      width: 'auto'
    }
  },
  ok: {
    width: '160px',
    height: '160px',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    '& svg': {
      width: '85px',
      height: '85px'
    }
  }
};

export default styles;
