import { colors } from 'mui/theme/colors';

const styles = {
  containerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
    flexGrow: 1
  },

  container: {
    color: colors.white,
    borderRadius: '24px',
    margin: '20px',
    padding: '48px 32px',
    backgroundColor: colors.black1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    gap: 3,
    overflow: 'auto',
    mt: '76px',
    height: '100%',
    alignSelf: 'center',
    maxWidth: '500px'
  },

  description: {
    color: '#999',
    span: {
      color: colors.white
    }
  },

  stackNextButton: {
    mt: 'auto',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: 500,
    maxWidth: '100%',
    letterSpacing: '-0.96px',
    textTransform: 'initial',
    color: colors.white,
    backgroundColor: colors.secondary,
    '&:hover': {
      backgroundColor: colors.secondary
    }
  },

  avatarGroup: {
    '& .MuiAvatarGroup-avatar': {
      width: '100px',
      height: '100px',
      fontSize: '10px',
      backgroundColor: '#efefef',
      border: '0px solid #efefef',
      color: '#000',
      marginLeft: '-48px'
    }
  }
};

export default styles;
