import { colors } from 'mui/theme/colors';

const styles = {
  subtitle: {
    pt: 4,
    position: 'absolute',
    bottom: '0',
    '@media only screen and (max-width: 768px)': {
      left: 'clamp(20px, 6.977vw, 200px)',
      right: 'clamp(20px, 6.977vw, 200px)'
    },
    left: 'clamp(40px, 14.535vw, 400px)',
    right: 'clamp(40px, 14.535vw, 400px)',

    fontSize: 'clamp(32px, 3.721vw, 320px)',
    lineHeight: '100%',
    color: colors.white,
    span: {
      color: colors.green
    }
  }
};

export default styles;
