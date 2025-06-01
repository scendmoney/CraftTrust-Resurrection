import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: {
    px: 'clamp(24px, 2.68vw, 48px)',
    py: '24px',
    display: 'flex',
    flexDirection: 'column'
  },
  blockWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    gap: '40px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    mt: '48px'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '24px'
  },
  borderWraper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.10)',
    padding: '24px',
    width: '100%'
  },

  facilityContent: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row',
      xl: 'row'
    },
    justifyContent: 'space-between',
    gap: '24px',
    alignItems: 'flex-start',
    mt: 'clamp(24px, 2.679vw, 48px)'
  },
  facilityInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: `1px solid ${colors.gray1}`
    },
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '70%'
    },
    pr: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: '24px'
    },
    pt: '24px'
  },
  facilityInfoWrapperPickup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    pr: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: '24px'
    },
    pt: '24px'
  },
  facilityContactPersonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    pt: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: '24px'
    },
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '30%'
    }
  }
};

export default styles;
