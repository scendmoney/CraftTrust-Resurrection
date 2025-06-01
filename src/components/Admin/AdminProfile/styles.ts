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
  notificationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: 2,
      sm: 1
    }
  },
  notification: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    alignItems: 'center'
  }
};

export default styles;
