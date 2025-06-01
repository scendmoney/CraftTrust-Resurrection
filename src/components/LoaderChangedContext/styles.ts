import { colors } from 'mui/theme/colors';

const styles = {
  backdrop: {
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: colors.gray1,
    backgroundImage: 'url("/resources/svg/authBackground.svg");',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right -300px bottom -200px',
    backgroundSize: 'contain',
    '@media only screen and (max-width: 900px)': {
      backgroundPosition: 'right -200px bottom -100px',
      backgroundSize: 'contain'
    },
    '@media only screen and (max-width: 400px)': {
      backgroundPosition: 'right -100px bottom 0px',
      backgroundSize: 'contain'
    },
    pb: 4
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
    minHeight: '175px',
    gap: 4
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 3
  },
  avatar: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden'
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    p: 1.25,
    zIndex: 1
  },
  avatarBackground: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    p: 0.25,
    backgroundImage: `conic-gradient( from 45deg, #fff 0deg 90deg, #fff 90deg 180deg, #fff 180deg 270deg, ${colors.secondary} 270deg 360deg)`,
    animation: 'rotateBorder 5s infinite linear',
    '@keyframes rotateBorder': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  },
  avatarFiller: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  }
};

export default styles;
