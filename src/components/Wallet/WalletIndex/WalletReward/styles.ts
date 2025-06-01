import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',

    gap: '8px',
    backgroundColor: '#efefef',
    borderRadius: '16px',
    padding: 2
  },
  boxButton: {
    padding: '8px 12px',
    fontSize: '12px',
    borderRadius: '12px',

    backgroundColor: colors.secondary,
    color: colors.white,
    fontWeight: 600
  }
};

export default styles;
