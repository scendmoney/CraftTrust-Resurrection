const styles = {
  tabs: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    marginTop: 'auto',
    overflowX: 'auto',
    gap: 2,
    height: '60px',
    maxHeight: '60px',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '@media only screen and (max-width: 1050px)': {
      gap: 1,
      ml: '20px'
    }
    // borderBottom: `1px solid ${colors.gray4}`
  }
};

export default styles;
