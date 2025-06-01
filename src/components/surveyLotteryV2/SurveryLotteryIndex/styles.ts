import { colors } from 'mui/theme/colors';

const styles = {
  containerWrapper: {
    minHeight: '100vh',
    maxWidth: '500px',
    position: 'relative',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  container: {
    paddingTop: '50px',
    gap: 3,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    px: '16px'
  },

  imgWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  },
  floatedImg: {
    position: 'absolute',
    left: '20px',
    top: '80px',
    width: '142px',
    height: '142px',
    transform: 'rotate(20deg)',
    backgroundColor: '#fff'
  },
  star: {
    position: 'absolute',
    left: '80px',
    top: '180px',

    zIndex: 99
  },
  imgBlur: {
    backgroundColor: colors.black,
    position: 'absolute',
    zIndex: 0,
    bottom: '20%',
    right: '0',
    width: '100%',
    opacity: '0.3',
    objectFit: 'cover',
    maskImage:
      'linear-gradient(to top, transparent 10px, black, black, transparent calc(100% - 10px))',
    height: '400px'
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    zIndex: 1,
    maxWidth: '500px',
    mb: '100px'
  },
  title: {
    lineHeight: '100%',
    color: colors.white,
    span: {
      color: colors.green
    }
  },
  subtitle: {
    color: colors.white,
    opacity: '0.5',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    pb: {
      xs: 0,
      sm: 4,
      md: 0
    }
  },
  stackNextButtonWrapper: {
    position: 'fixed',
    bottom: '20px',
    left: '0px',
    right: '0px',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center'
  },
  stackNextButton: {
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: 500,
    maxWidth: '500px',
    mx: '16px',
    letterSpacing: '-0.96px',
    textTransform: 'initial',
    color: colors.white,
    backgroundColor: colors.secondary,
    '&:hover': {
      backgroundColor: colors.secondary
    }
  }
};

export default styles;
