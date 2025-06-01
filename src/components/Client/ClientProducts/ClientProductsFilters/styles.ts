const styles = {
  headerLineLeft: {
    flexGrow: 1,
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    '@media only screen and (max-width: 600px)': {
      overflowX: 'auto',
      scrollBehavior: 'smooth',
      scrollSnapType: 'x mandatory',
      flexWrap: 'nowrap',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  }
};
export default styles;
