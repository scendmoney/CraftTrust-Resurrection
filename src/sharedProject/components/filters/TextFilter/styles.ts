import { colors } from 'mui/theme/colors';

const styles = {
  label: {
    fontSize: '12px',
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
    borderRadius: '12px',
    padding: '12px 16px',
    fontWeight: 400,
    backgroundColor: colors.gray1,
    fontSize: '16px',
    border: `1px solid ${colors.gray1}`,
    input: {
      padding: 0
    }
  }
};

export default styles;
