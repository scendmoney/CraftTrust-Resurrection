import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: {
    px: 'clamp(24px, 2.68vw, 48px)',
    py: '24px',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    flexWrap: 'wrap',
    gap: '16px',
    mt: '8px'
  },
  summary: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: '12px',
    border: `1px solid ${colors.gray4}`,
    gap: '16px',
    p: 'clamp(16px, 1.34vw, 24px)'
  },
  payment: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: `1px solid ${colors.gray4}`,
    gap: '16px',
    p: 'clamp(16px, 1.34vw, 24px)'
  },
  blockWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    gap: {
      xs: 2,
      sm: 4,
      md: 'clamp(24px, 8vw, 480px)'
    },
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    mt: 4
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '24px'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    backgroundColor: colors.black,
    color: colors.white,
    textAlign: 'center',
    borderRadius: '12px',
    padding: '12px 16px'
  },
  codeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    color: colors.black1,
    alignItems: 'center',
    textAlign: 'center',
    padding: '12px 16px'
  },
  nftWrapper: {
    display: 'flex',
    cursor: 'pointer',
    width: 'max-content',
    flexDirection: 'row',
    gap: 2,
    color: colors.black1,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '12px',
    padding: '12px 16px',
    border: `1px solid ${colors.gray4}`
  },
  nftTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center'
  }
};

export default styles;
