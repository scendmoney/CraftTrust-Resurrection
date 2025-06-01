const styles = {
  metrcWrapper: {
    display: 'flex',
    flexDirection: 'column',
    p: 'clamp(24px, 2.679vw, 48px)',
    gap: '24px',
    pb: {
      xs: 15,
      sm: 12,
      md: 'clamp(48px, 8vw, 80px)'
    }
  },

  package: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  cardActionWrapper: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.10)',
    borderRadius: '0',
    px: 0.5,
    py: '16px'
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5
  }
};

export default styles;
