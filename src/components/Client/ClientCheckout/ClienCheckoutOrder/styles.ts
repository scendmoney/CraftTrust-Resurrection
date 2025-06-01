const styles = {
  orderWraper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.10)',
    padding: '24px',
    minWidth: '300px',
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
  }
};

export default styles;
