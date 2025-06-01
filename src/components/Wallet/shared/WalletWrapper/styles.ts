const styles = {
  container: {
    backgroundColor: '#076427',
    backgroundImage: 'url("/resources/wallet/wallet-bg.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 0%',
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    position: 'fixed',
    zIndex: 100,
    top: '10px',
    left: '50%',
    px: 2,
    transform: 'translateX(-50%)',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    backgroundColor: '#111',
    px: 2,
    height: '40px',
    display: 'flex',
    borderRadius: '100px'
  },
  buttons: {
    backgroundColor: '#111',
    color: '#18D458',
    height: '40px',
    borderRadius: '30px',
    pr: 0.5,
    pl: 1.5,
    display: 'flex'
  }
};

export default styles;
