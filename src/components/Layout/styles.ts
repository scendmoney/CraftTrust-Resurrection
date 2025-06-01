const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    flexGrow: 1,
    '@supports (-webkit-touch-callout: none)': {
      minHeight: '-webkit-fill-available'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
};
export default styles;
