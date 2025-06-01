const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'flex-start',
    '@media only screen and (max-width: 1050px)': {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  leftBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(16px, 2vw, 32px)',
    flexWrap: 'wrap',
    minWidth: '41vw'
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: 1,
      sm: 2
    }
  },
  line: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(16px, 2vw, 32px)',
    flexWrap: 'wrap'
  },
  rightBlock: {
    maxWidth: '45vw',
    '@media only screen and (max-width: 1050px)': {
      maxWidth: '100%'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 1,
    minHeight: '80px'
  },
  metrcBadge: {
    width: '117px',
    height: '50px',
    '@media only screen and (max-width: 600px)': {
      width: '88px',
      height: '38px'
    }
  },
  nameWrapper: { display: 'flex', alignItems: 'center', gap: 3 },
  socilaAddressContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    flexWrap: {
      xs: 'wrap',
      sm: 'wrap',
      md: 'wrap',
      lg: 'wrap',
      xl: 'nowrap'
    },
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mt: 2,
    gap: 1
  },
  license: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
    '& svg': {
      width: 'clamp(24px, 2vw, 48px)',
      height: 'clamp(24px, 2vw, 48px)'
    }
  },
  licenseIcon: { display: 'inline-block', verticalAlign: 'middle' }
};

export default styles;
