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
    px: 'clamp(16px, 1.34vw, 24px)',
    backgroundColor: colors.black1,
    minHeight: '100vh',
    minWidth: '280px'
  },

  finish: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    boxShadow:
      '0px 15px 33px 0px rgba(0, 0, 0, 0.07), 0px 59px 59px 0px rgba(0, 0, 0, 0.06), 0px 133px 80px 0px rgba(0, 0, 0, 0.03), 0px 237px 95px 0px rgba(0, 0, 0, 0.01), 0px 370px 104px 0px rgba(0, 0, 0, 0.00)',
    p: 4,
    borderRadius: '12px',
    mx: 'clamp(16px, 1.34vw, 24px)',
    mt: 4,
    mb: 4,

    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
};

export default styles;
