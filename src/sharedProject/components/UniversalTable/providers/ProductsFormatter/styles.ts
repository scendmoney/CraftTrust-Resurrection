const styles = {
  container: {
    display: 'flex',
    gap: 1,
    alignItems: 'center'
  },
  avatar: {
    width: '44px',
    height: '44px',
    objectFit: 'cover',
    backgroundColor: '#eee',
    borderRadius: '50%'
  },
  avatarGroup: {
    '& .MuiAvatarGroup-avatar': {
      width: '24px',
      height: '24px',
      fontSize: '10px',
      backgroundColor: '#efefef',
      border: '1px solid #efefef',
      color: '#000'
    }
  }
};

export default styles;
