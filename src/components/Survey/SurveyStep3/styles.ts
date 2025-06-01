import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: colors.white,
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    mt: '70px',
    px: '16px'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%',
    maxWidth: '500px',
    mt: 6,
    flexGrow: 1
  },
  subtitle: {
    lineHeight: '100%',
    color: colors.white,
    span: {
      color: colors.green
    }
  },
  question: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: '12px',
    px: '26px',
    py: '24px',
    mb: '24px',
    flexGrow: 1
  },
  unlocked: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.green,
    borderRadius: '12px',
    p: '48px',
    flexGrow: 1,
    mb: '24px',
    textAlign: 'center'
  },

  img: {
    width: '200px',
    height: '200px',
    alignContent: 'center'
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '200px'
  }
};

export default styles;
