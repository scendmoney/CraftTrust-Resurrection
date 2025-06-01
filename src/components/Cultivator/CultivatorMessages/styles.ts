import { colors } from 'mui/theme/colors';

const styles = {
  chat: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: {
      xs: '0',
      sm: '0',
      md: '270px',
      lg: `270px`
    },
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    backgroundColor: colors.gray1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',

    flexGrow: 1
  },

  drawerDesktop: {
    position: 'absolute',
    top: '16px',
    left: {
      xs: '36px',
      sm: '36px',
      md: '0',
      lg: `0`
    },
    bottom: '16px',
    width: {
      xs: 'calc(100% - 48px)',
      sm: 'calc(100% - 48px)',
      md: '270px',
      lg: `270px`
    },

    zIndex: 2,

    flexGrow: 1,
    display: 'flex'
  },

  title: {
    position: 'absolute',
    top: '18px',
    left: '50%'
  }
};

export default styles;
