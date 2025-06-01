import { colors } from 'mui/theme/colors';

const styles = {
  title1: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    transform: 'translateY(-10vh)',
    mx: 'clamp(20px, 2.326vw, 200px)',
    zIndex: 8,
    gap: 4,
    color: colors.white
  },
  h1: {
    fontSize: 'clamp(40px, 4.814vw, 80px)',
    lineHeight: '90%',
    letterSpacing: '-0.04em',
    display: 'flex',
    flexDirection: 'column',
    span: {
      color: colors.green
    }
  },
  wordContainer: {
    display: 'inline-block',
    overflow: 'hidden'
  },
  wordAnimation: {
    transform: 'translateY(100%)',
    animation: 'slideUp 0.5s ease-out forwards',
    '@keyframes slideUp': {
      from: {
        opacity: 0,
        transform: 'translateY(100%)'
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  },
  badges: {
    display: 'flex',
    gap: 1,
    opacity: 0,
    animation: 'fade 2s ease-out forwards',
    '@keyframes fade': {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    }
  },
  badge: {
    width: '140px',
    height: '56px',
    '@media only screen and (max-width: 480px)': {
      width: 'clamp(80px, 28vw, 140px)',
      height: 'clamp(37px, 11.7vw, 56px)'
    }
  }
};

export default styles;
