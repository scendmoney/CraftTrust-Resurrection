const styles = {
  empoyeeWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    justifyContent: 'space-between',
    py: '24px',
    px: '8px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.10)'
  },
  empoyeeTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '48px',
    height: '48px',

    borderRadius: '50%',
    backgroundColor: '#EFEFEF',
    '& svg': {
      width: '24px',
      height: '24px'
    }
  }
};

export default styles;
