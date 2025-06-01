import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    color: colors.black,
    gap: '20px'
  },
  text: {
    fontSize: '20px',
    lineHeight: '100%',
    fontWeight: '500'
  },
  logo: {
    width: 'clamp(52px, 2.907vw, 520px)',
    height: 'clamp(52px, 2.907vw, 520px)',
    objectFit: 'contain'
  }
};

export default styles;
