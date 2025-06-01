const styles = (isSquare?: boolean) => {
  return {
    block: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      borderRadius: isSquare ? '12px' : '50%',
      overflow: 'hidden',
      width: isSquare ? 'clamp(200px, 11.1vw, 1000px)' : 'clamp(96px, 9.259vw, 960px)',
      height: isSquare ? 'clamp(200px, 11.1vw, 1000px)' : 'clamp(96px, 9.259vw, 960px)'
    },

    assetContainer: {
      display: 'flex',
      flexDireaction: 'column',
      backgroundColor: '#eee',

      '> img': {
        width: '100%',
        height: 'auto',
        objectFit: 'cover'
      }
    },
    cover: {
      position: 'absolute',
      display: 'flex',
      flexDireaction: 'column',
      alignItems: 'flex-end',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      color: '#fff',
      opacity: 0,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        opacity: 1,
        backgroundColor: '#00000055'
      }
    },
    icon: {
      color: '#fff',
      backgroundColor: '#00000044',
      zIndex: 10,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '&:hover': {
        backgroundColor: '#00000066'
      }
    }
  };
};

export default styles;
