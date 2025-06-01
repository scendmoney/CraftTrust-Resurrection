import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    gap: 1,
    alignItems: 'center'
  },
  avatarGroup: {
    '& .MuiAvatarGroup-avatar': {
      width: '24px',
      height: '24px',
      fontSize: '10px',
      backgroundColor: '#efefef',
      border: '1px solid #efefef',
      color: colors.black
    }
  }
};

export default styles;
