import { colors } from 'mui/theme/colors';

const styles = {
  dialog: {
    '& .MuiBackdrop-root': {
      backdropFilter: 'blur(4px)!important'
    }
  },
  block: {
    borderRadius: '8px',
    overflow: 'hidden',
    top: '1vh',
    bottom: '1vh',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',

    transform: 'translateX(-50%)',
    boxShadow: '0 10px 25px rgb(0 0 0 / 30%)',

    flexGrow: 1,
    backgroundColor: '#fff',
    minWidth: '500px',
    '@media only screen and (max-width: 768px)': {
      minWidth: '280px'
    }
  },
  close: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    zIndex: 10001,
    background: colors.black,
    color: colors.white,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: colors.black1
    }
  }
};

export default styles;
