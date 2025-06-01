const styles = {
  img: {
    objectFit: 'contain',
    borderRadius: '12px',
    width: '100%',

    height: 'auto'
  },
  update: {
    position: 'absolute',
    top: 4,
    right: 4
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flexGrow: 1
  },
  block: {
    minHeight: '500px',
    maxWidth: '500px',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    pl: 4,
    borderRadius: '24px 24px 0 0',
    marginTop: '160px',
    '@media only screen and (max-width: 500px)': {
      borderRadius: '0'
    }
  },
  cards: {
    backgroundColor: '#fff',
    display: 'flex',
    boxShadow: '0px 10px 10px #00000011',
    padding: 4,
    borderRadius: '24px',
    transform: 'translateY(-75px)',
    mr: 4
  },
  nfts: {
    '@media only screen and (max-width: 500px)': {
      '::-webkit-scrollbar': {
        display: 'none'
      }
    },
    display: 'flex',
    overflowX: 'auto',
    gap: '10px'
  },
  rewards: {
    display: 'flex',
    mr: 4,
    mb: 2
  }
};

export default styles;
