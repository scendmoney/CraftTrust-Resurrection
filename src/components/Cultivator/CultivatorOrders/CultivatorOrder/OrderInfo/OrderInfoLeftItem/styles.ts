import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  icon: {
    backgroundColor: colors.white,
    padding: 'clamp(10px, 0.558vw, 100px)',
    borderRadius: 'clamp(40px, 2.23vw, 400px)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'clamp(24px, 2.778vw, 48px)',
    width: 'clamp(24px, 2.778vw, 48px)',
    '> svg': {
      width: 'clamp(16px, 1.34vw, 24px)',
      height: 'clamp(16px, 1.34vw, 24px)'
    }
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
};

export default styles;
