const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: {
      xs: '100%',
      sm: 'auto'
    }
  },
  orderWraper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.10)',
    padding: '24px',
    width: {
      xs: '100%',
      sm: '100%',
      md: 'clamp(320px, 30vw, 3000px)'
    },
    gap: '16px'
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px'
  },
  totalWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  deliveryWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    alignItems: 'flex-start',
    '& svg': {
      width: 'clamp(24px, 1.786vw, 320px)',
      height: 'clamp(24px, 1.786vw, 320px)'
    }
  },
  total: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
};

export default styles;
