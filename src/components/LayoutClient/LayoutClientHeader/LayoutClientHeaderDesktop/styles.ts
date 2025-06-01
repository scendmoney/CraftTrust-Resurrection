const styles = {
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 'clamp(24px, 2.68vw, 240px)',
    py: 'clamp(12px, 1.34vw, 120px)'
  },
  wrapperHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  listWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  avatar: {
    width: '48px',
    height: '48px'
  },
  avatarFacility: {
    width: '48px',
    height: '48px',
    right: '-24px',
    position: 'absolute'
  },
  avatarsWrapper: {
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',
    ml: '20px'
  },
  facilityWrapper: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.10)',
    padding: '0px 8px'
  },
  badge: {
    span: {
      outline: '0px solid #fff',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      top: '6px',
      right: '6px'
    }
  }
};

export default styles;
