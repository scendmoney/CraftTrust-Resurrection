const styles = {
  container: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    py: 0.5
  },
  avatar: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    backgroundColor: '#eee',
    borderRadius: '16px',
    '@media only screen and (max-width: 1050px)': {
      width: '40px',
      height: '40px'
    }
  },
  badge: {
    span: {
      outline: '2px solid #fff',
      top: '4px',
      right: '4px'
    }
  }
};

export default styles;
