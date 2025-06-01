const styles = {
  facilityContent: {
    display: 'flex',
    px: '20px',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row',
      xl: 'row'
    },
    justifyContent: 'space-between',
    gap: '24px',
    alignItems: 'flex-start'
    // mt: 'clamp(24px, 2.679vw, 48px)'
  },
  facilityInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    pr: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: '24px'
    }
    // pt: '24px'
  }
};

export default styles;
