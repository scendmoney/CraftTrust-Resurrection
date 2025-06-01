import { colors } from 'mui/theme/colors';

const styles = {
  close: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 10001,
    background: colors.white,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: colors.white
    }
  },

  window: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',

    transform: 'translate(-50%, -50%)',
    zIndex: 10000,
    maxHeight: '80vh',
    '@media only screen and (max-width: 500px)': {
      minWidth: '90%'
    },
    img: {
      maxWidth: '100vw'
    }
  },
  buttons: {
    position: 'absolute',
    bottom: '10px',
    display: 'flex',
    gap: '8px',
    '> button': {
      backgroundColor: colors.white,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      opacity: '0.8',
      transition: 'opacity 0.3s ease-in-out',
      ':hover': {
        backgroundColor: colors.white,
        opacity: '1'
      }
    }
  },

  transformComponent: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing'
    }
  }
};

export default styles;
