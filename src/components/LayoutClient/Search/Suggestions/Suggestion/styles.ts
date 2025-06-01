const styles = {
  cardAction: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    justifyContent: 'space-between',
    gap: '8px',
    flexWrap: 'wrap',
    width: '100%',
    p: '8px'
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    width: {
      xs: '100%',
      sm: 'clamp(220px, 46vw, 880px)',
      md: 'clamp(220px, 30vw, 880px)',
      lg: 'clamp(220px, 25vw, 880px)'
    }
  }
};

export default styles;
