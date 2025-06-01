const styles = {
  valueWrapper: {
    // gap: '40px',
    display: 'flex',
    width: '100%',
    height: 'auto',
    overflowX: 'auto',
    overflowY: 'hidden',
    gap: '24px',
    pb: '14px',
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    '@media only screen and (max-width: 768px)': {
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  },

  arrowLeft: {
    position: 'absolute',
    left: '4px',
    top: '40%',
    transform: 'translateY(-50%)',
    zIndex: 100,
    color: '#333',
    backgroundColor: '#ffffff55',
    backdropFilter: 'saturate(180%) blur(8px)',
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  arrowRight: {
    position: 'absolute',
    right: '4px',
    top: '40%',
    transform: 'translateY(-50%)',
    zIndex: 100,
    color: '#333',
    backgroundColor: '#ffffff55',
    backdropFilter: 'saturate(180%) blur(8px)',
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  valueItem: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    minWidth: '170px',
    maxWidth: '170px',
    textAlign: 'center',
    scrollSnapAlign: 'center',

    transition: 'all 0.3s ease-in-out',
    '&:first-of-type': {
      marginLeft: 'calc(50% - 70px)'
    }
  },
  filler: { display: 'flex', overflow: 'hidden', height: '20px', minWidth: 'calc(50% - 70px)' },

  round: {
    display: 'flex',

    overflow: 'hidden',
    height: '170px',
    minWidth: '170px',
    textAlign: 'center',
    scrollSnapAlign: 'center',

    fontSize: '30px',
    borderRadius: '50%',

    transition: 'all 0.3s ease-in-out',
    mb: '24px',
    img: {
      objectFit: 'contain',
      width: '100%',
      height: 'auto'
    }
  }
};

export default styles;
