const styles = {
  cardsContainer: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    flexWrap: 'nowrap',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  cardWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'clamp(16px, 1.34vw, 24px)',
    backgroundColor: '#EFEFEF',
    borderRadius: '12px',
    width: 'clamp(300px, 19vw, 3000px)',
    scrollSnapAlign: 'start'
  },
  avatar: {
    width: '48px',
    height: '48px'
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  containerArrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrows: {
    display: 'flex',
    gap: '8px',
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  license: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center'
  }
};

export default styles;
