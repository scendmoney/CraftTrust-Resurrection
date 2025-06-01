const styles = {
  reveal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: '999998',
    animation: 'fadeIn 0.3s ease-in-out forwards',
    background: '#000',
    backgroundSize: '100px',
    animationDelay: '2s',

    opacity: 1,
    backgroundColor: '#000',
    pointerEvents: 'none',

    '@keyframes fadeIn': {
      '0%': { opacity: 1 },
      '99%': { opacity: 0 },
      '100%': { opacity: 0 }
    }
  },

  logo: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '50px',
    height: 'auto',
    zIndex: '999999',
    animation: 'showIn 2s ease-in',
    opacity: 0,
    transform: 'translate(-50%, -50%)',
    '@keyframes showIn': {
      '0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(1)' },
      '93%': { opacity: 1, transform: 'translate(-50%, -50%) scale(2)' },
      '100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(1.5)' }
    }
  },
  desktopContainer: {
    height: '280vh',
    position: 'relative',
    backgroundColor: '#000'
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column'
  },

  desktopContainerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2
  }
};

export default styles;
