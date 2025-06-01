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
    px: 4,
    pt: 4,
    flexGrow: 1,
    pb: {
      xs: 12,
      sm: 12,
      md: 8
    }
  }
};

export default styles;
