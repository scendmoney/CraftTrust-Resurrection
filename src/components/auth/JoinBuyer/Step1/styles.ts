import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    textAlign: 'center'
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

  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100px',
    '> span a': {
      color: colors.secondary
    }
  }
};

export default styles;
