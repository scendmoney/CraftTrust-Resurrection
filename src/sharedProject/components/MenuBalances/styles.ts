const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eee',
    borderRadius: 1,
    padding: 2,
    position: 'relative',
    minHeight: '95px'
  },
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 0.5
  },
  pending: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 1,
    pt: 1,
    alignItems: 'center',
    borderTop: '1px solid #ddd'
  },
  price: {
    display: 'flex',
    gap: 0.5,
    alignItems: 'center'
  },
  arrow: {
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#ddd'
    }
  }
};

export default styles;
