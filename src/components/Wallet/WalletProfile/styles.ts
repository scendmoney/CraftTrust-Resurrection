import { colors } from 'mui/theme/colors';

const styles = {
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: colors.black1,
    opacity: '50%',
    pb: 1
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flexGrow: 1
  },
  block: {
    minHeight: '500px',
    maxWidth: '500px',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    p: 4,
    borderRadius: '24px 24px 0 0',
    marginTop: '160px',
    '@media only screen and (max-width: 500px)': {
      borderRadius: '0'
    },
    '@media only screen and (max-width: 350px)': {
      p: 2
    }
  }
};

export default styles;
