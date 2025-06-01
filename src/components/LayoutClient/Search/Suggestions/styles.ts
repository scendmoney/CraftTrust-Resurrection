import { colors } from 'mui/theme/colors';

const styles = {
  suggestions: {
    top: 'clamp(55px, 3vw, 550px)',
    left: '0px',
    position: 'absolute',
    width: '100%',
    color: colors.black,
    backgroundColor: colors.white,
    boxShadow:
      '0px 7px 15px 0px rgba(0, 0, 0, 0.10), 0px 28px 28px 0px rgba(0, 0, 0, 0.09), 0px 62px 37px 0px rgba(0, 0, 0, 0.05), 0px 111px 44px 0px rgba(0, 0, 0, 0.01), 0px 173px 48px 0px rgba(0, 0, 0, 0.00)',
    opacity: 1,
    gap: '16px',
    p: 'clamp(10px, 1.34vw, 24px)',
    borderRadius: '12px',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflowY: 'auto'
  },
  loading: {
    top: 'clamp(55px, 3vw, 550px)',
    left: '0px',
    position: 'absolute',
    width: '100%',
    color: colors.black,
    backgroundColor: colors.white,
    boxShadow:
      '0px 7px 15px 0px rgba(0, 0, 0, 0.10), 0px 28px 28px 0px rgba(0, 0, 0, 0.09), 0px 62px 37px 0px rgba(0, 0, 0, 0.05), 0px 111px 44px 0px rgba(0, 0, 0, 0.01), 0px 173px 48px 0px rgba(0, 0, 0, 0.00)',
    opacity: 1,
    gap: '16px',
    px: 'clamp(8px, 0.897vw, 240px)',
    py: 'clamp(16px, 0.897vw, 240px)',
    borderRadius: '12px',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '7.5rem'
  }
};

export default styles;
