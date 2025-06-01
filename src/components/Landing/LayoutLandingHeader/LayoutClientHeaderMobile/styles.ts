import { colors } from 'mui/theme/colors';

const styles = {
  header: {
    position: 'fixed',
    top: 'clamp(10px, 2.326vw, 200px)',
    left: 'clamp(20px, 2.326vw, 200px)',
    right: 'clamp(20px, 2.326vw, 200px)',

    display: 'flex',
    background: colors.black,
    justifyContent: 'space-between',
    color: colors.white,
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 9
  },
  iconButton: {
    borderRadius: '100px',
    px: 'clamp(10px, 3.5vw, 240px)',
    py: 'clamp(5px, 1.2vw, 160px)',
    backgroundColor: colors.black1,
    color: colors.white,

    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: colors.black
    }
  },
  headerMenu: {
    position: 'relative',
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    p: 2,

    flexDirection: 'column',
    '>button': {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      padding: 'clamp(12px, 1.2vw, 120px) clamp(12px, 1.2vw, 120px) ',
      borderRadius: '100px',
      fontSize: 'clamp(20px, 3vw, 50)',
      lineHeight: '100%'
    }
  },
  drawerMobile: {
    display: { xs: 'block' },

    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      backgroundColor: colors.black1,

      minWidth: '320px',
      color: colors.white,
      borderRadius: 0,
      border: `none`
    }
  }
};

export default styles;
