import { colors } from 'mui/theme/colors';

const styles = {
  label: {
    fontSize: 'clamp(12px, 0.694vw, 120px)',
    fontWeight: 500,
    color: colors.black1,
    opacity: '50%',
    pb: 1
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1
  },
  input: {
    borderRadius: 'clamp(12px, 0.694vw, 120px)',
    padding: 'clamp(12px, 0.694vw, 120px) clamp(16px, 0.926vw, 160px)',
    fontWeight: 400,
    backgroundColor: colors.gray1,
    fontSize: 'clamp(14px, 0.926vw, 140px)',
    border: `1px solid ${colors.gray1}`,
    input: {
      padding: 0
    }
  }
};

export default styles;
