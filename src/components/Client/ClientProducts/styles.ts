import { colors } from 'mui/theme/colors';

const styles = {
  headerLine: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    mb: 3,
    flexWrap: 'wrap'
  },
  notFound: {
    display: 'flex',
    justifyContent: 'center',
    mt: '48px'
  },
  stackButtonWrapper: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    gap: '8px'
  },
  stackBackButton: {
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: 500,
    maxWidth: '100%',
    letterSpacing: '-0.96px',
    textTransform: 'initial',
    color: colors.white,
    backgroundColor: colors.black1,
    '&:hover': {
      backgroundColor: colors.secondary
    }
  },
  badge: {
    position: 'fixed',
    backgroundColor: colors.secondary,
    bottom: 'clamp(20px, 1.4vw, 200px)',
    right: 'clamp(20px, 2vw, 200px)',
    zIndex: '1000',
    width: '64px',
    height: '64px',
    '&:hover': {
      backgroundColor: colors.secondary
    }
  }
};

export default styles;
