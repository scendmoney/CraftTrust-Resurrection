import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    position: 'fixed',
    bottom: '10px',
    left: '50%',
    right: 0,
    zIndex: 1000,
    transform: 'translateX(-50%)',
    backgroundColor: colors.black1,
    padding: '12px 12px 12px 24px',
    gap: 1,
    borderRadius: '24px',
    width: {
      xs: '95%',
      sm: '70%',
      md: 'clamp(280px, 48vw, 2800px)'
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media only screen and (max-width: 768px)': {
      padding: '18px'
    }
  },
  menu: {
    color: colors.black,
    '& .MuiMenu-list': {},
    '& .MuiListItemText-primary': {
      color: colors.black,
      fontWeight: 500
    }
  },
  buttons: {
    display: 'flex',
    gap: 1
  }
};

export default styles;
