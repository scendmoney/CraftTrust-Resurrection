import { colors } from 'mui/theme/colors';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: colors.white,
    alignItems: 'flex-start',
    px: 'clamp(16px, 1.34vw, 24px)',
    pt: 'clamp(16px, 1.34vw, 24px)'
  },

  title: {
    display: 'flex',
    alignSelf: 'center',
    px: 'clamp(16px, 1.34vw, 24px)',
    span: {
      color: colors.green
    }
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    px: 0,
    backgroundColor: colors.black,
    minHeight: '100vh'
  },

  form: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: '440px',

    backgroundColor: colors.white,
    p: 3,
    '@media only screen and (max-width: 500px)': {
      width: '100%',
      p: 2
    },
    gap: 2,
    display: 'flex',
    borderRadius: '12px',
    mb: 3,
    img: {
      borderRadius: '8px'
    }
  }
};

export default styles;
