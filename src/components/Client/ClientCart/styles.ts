const styles = {
  wrapper: {
    px: 'clamp(24px, 2.68vw, 48px)',
    pb: 'clamp(24px, 2.68vw, 48px)',
    pt: {
      xs: 0,
      sm: 'clamp(24px, 2.68vw, 48px)'
    },
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
    justifyContent: {
      xs: 'flex-start',
      sm: 'space-between'
    },
    mt: {
      xs: 3,
      sm: 6
    }
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: {
      xs: 5,
      sm: 3
    }
  }
};

export default styles;
