const styles = {
  container: {
    display: 'flex',
    flexDirection: 'space-between',
    alignItems: 'center',
    gap: 1,
    '@media only screen and (max-width: 768px)': {
      flexDirection: 'column'
    },
    '*': {
      width: '100%'
    }
  }
};

export default styles;
