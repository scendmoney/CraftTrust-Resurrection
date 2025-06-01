const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.5fr',
    height: '100%',
    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    p: 4,
    flexGrow: 1,
    mb: {
      xs: 8,
      sm: 6,
      md: 2
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
