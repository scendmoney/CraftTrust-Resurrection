const styles = {
  block: {
    maxWidth: '500px',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: '24px 24px 0 0',

    '@media only screen and (max-width: 350px)': {
      padding: 2
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh',
    minHeight: '200px',
    gap: 4
  },
  sendAgain: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
};

export default styles;
