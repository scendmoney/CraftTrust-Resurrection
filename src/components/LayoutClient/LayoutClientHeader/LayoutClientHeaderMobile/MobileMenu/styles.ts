import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    position: 'relative'
  },
  drawerMobile: {
    display: { xs: 'block' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 0,
      border: `none`,
      boxShadow: 'none'
    }
  },
  divider: {
    py: 0.5,
    height: '100%'
  },
  avatarPosition: {
    position: 'absolute',
    left: '-70px',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center'
  },
  chatPosition: {
    position: 'absolute',
    left: '-130px',
    height: '100%',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center'
  },
  menuPosition: {
    position: 'absolute',
    left: '-40px',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center'
  },
  menuIcon: {
    backgroundColor: colors.black1,
    ':hover': {
      backgroundColor: colors.black1
    }
  }
};

export default styles;
