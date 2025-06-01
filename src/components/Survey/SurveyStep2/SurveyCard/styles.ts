const styles = (position: 'top' | 'middle' | 'back' | 'hidden') => {
  return {
    children: {
      mt: 'auto',
      mb: 'auto',
      position: 'relative'
    },
    questionTitle: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      pl: '32px',
      pr: '8px',
      mt: '4vh'
    },
    card: {
      transition: 'all 0.7s ease-in-out',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      gap: 2,
      borderRadius: '12px',
      py: '20px',

      '&::-webkit-scrollbar': {
        display: 'none'
      },
      ...getStylesPosition(position)
    }
  };
};

function getStylesPosition(position: 'top' | 'middle' | 'back' | 'hidden') {
  if (position === 'middle') {
    return {
      top: '10px',
      right: '30px',
      left: '30px',
      bottom: '10px',
      width: 'unset',
      zIndex: 999,
      backgroundColor: '#717171'
    };
  }
  if (position === 'back') {
    return {
      top: '0px',
      right: '40px',
      left: '40px',
      bottom: '10px',
      width: 'unset',
      zIndex: 998,
      backgroundColor: '#3E3E3E'
    };
  }
  if (position === 'hidden') {
    return {
      top: '0px',
      left: 'calc(-100% + 20px)',
      right: 'calc(100% + 20px)',
      width: 'unset',
      bottom: '20px',
      zIndex: 1001,
      backgroundColor: '#fff'
    };
  }
  return {
    top: '20px',
    left: '20px',
    right: '20px',
    width: 'unset',
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#fff'
  };
}

export default styles;
