const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.5fr',

    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr'
    }
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  totalWrapper: {
    px: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    p: 'clamp(16px, 1.786vw, 320px)',
    flexGrow: 1,
    height: '98vh',
    overflowY: 'auto',
    '@media only screen and (max-width: 1050px)': {
      overflowY: 'initial'
    }
  },
  facilityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    pb: 2
  }
};

export default styles;
