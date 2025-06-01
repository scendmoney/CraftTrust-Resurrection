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
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: colors.white,
    alignItems: 'center'
  },
  content: {
    display: 'grid',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    pt: 5,
    pb: 2,
    '@media only screen and (max-width: 400px)': {
      pt: 10
    },
    overflowY: 'auto',
    flexDirection: 'column',
    gap: '16px'
  },
  box: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: {
      xs: '80vw',
      sm: 'clamp(450px, 35vw, 2500px)'
    },
    px: 'clamp(24px, 2.68vw, 48px)',
    py: 'clamp(24px, 2.68vw, 48px)'
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
  divider: {
    width: '100%',
    pb: 3,
    pt: 3
  }
};

export default styles;
