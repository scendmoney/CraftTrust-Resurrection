import { colors } from 'mui/theme/colors';

const width = '280px';

const styles = {
  container: {
    display: 'flex',
    flexGrow: 1,
    overflowX: 'auto'
  },
  drawerWrapper: { width: { md: width }, flexShrink: { md: 0 } },
  drawerDesktop: {
    display: { xs: 'none', md: 'block' },

    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: width,
      backgroundColor: colors.gray1,
      borderRadius: 0,
      border: 'none',
      boxShadow: 'none'
    }
  },
  drawerMobile: {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: width,
      backgroundColor: colors.gray1,
      borderRadius: 0,
      border: `none`,
      boxShadow: 'none'
    }
  },
  children: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: { md: `calc(100% - ${width})`, xs: '100%' }
  },
  mobileMenu: {
    position: 'absolute',
    top: 2,
    left: 2,
    zIndex: 1000,
    height: '60px',
    borderRadius: 0,
    width: '30px',
    minWidth: '0',
    px: 0,
    mx: 0
  }
};

export default styles;
