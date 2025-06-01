const styles = {
  empoyeeWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    gap: {
      xs: '16px',
      sm: 0
    },
    py: '24px',
    px: '8px'
  },
  empoyeeTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  avatar: {
    width: '48px',
    height: '48px'
  },
  cardActionWrapper: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.10)',
    borderRadius: '0'
  }
};

export default styles;
