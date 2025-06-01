const styles = {
  wrapper: {
    px: 'clamp(24px, 2.68vw, 240px)',
    display: 'flex',
    flexDirection: 'column'
  },
  tableWrapper: {
    position: 'relative',
    pl: 3,
    pr: 5,
    pt: 4,
    pb: 3,
    mt: 2,
    border: '1px solid #EFEFEF',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  cached: { position: 'absolute', top: '3px', right: '3px', zIndex: '1001' }
};

export default styles;
