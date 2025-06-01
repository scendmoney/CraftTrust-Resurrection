import { colors } from 'mui/theme/colors';

const styles = {
  title1: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    gap: '5vh',
    top: 0,
    height: '98vh',

    left: 'clamp(20px, 2.326vw, 200px)',
    zIndex: 8,
    color: colors.white,
    maxWidth: '70vw',
    h3: {
      fontSize: 'clamp(18px, 1.852vw, 180px);'
    }
  },
  h1: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'clamp(40px, 4.63vw, 400px)',
    lineHeight: '90%',
    letterSpacing: '-0.04em',
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
  badge: {
    width: '140px',
    height: '56px'
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
  }
};

export default styles;
