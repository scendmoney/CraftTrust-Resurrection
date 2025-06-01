import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    px: 'clamp(8px, 2.778vw, 240px)',
    backgroundColor: colors.gray1,
    height: 'auto',
    minHeight: '100vh',
    flexShrink: 'inherit',
    py: 3,
    gap: 2
  },
  menuIcon: {
    backgroundColor: colors.black1,
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  avatarPosition: {
    position: 'absolute',
    left: '-70px',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center'
  },
  menuPosition: {
    position: 'absolute',
    left: '-40px',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center'
  },
  iconContainer: {
    display: 'flex',
    position: 'relative'
  },

  listIcon: {
    minWidth: '35px'
  },
  cultivatorsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  avatar: {
    width: 'clamp(32px, 1.786vw, 320px)',
    height: 'clamp(32px, 1.786vw, 320px)'
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px'
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    px: '8px',
    py: '16px',
    gap: 2,
    backgroundColor: colors.white,
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgb(0 0 0 / 10%)'
  },
  nameWrapperFacility: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    mb: '8px'
  },
  facilityAvatar: {
    border: '2px solid white',
    width: 'clamp(32px, 1.786vw, 320px)',
    height: 'clamp(32px, 1.786vw, 320px)'
  },
  name: {
    color: colors.black
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '12px',
    px: '8px',
    py: '4px',
    gap: '8px',
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  facilitiesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    px: '8px'
  },
  divider: {
    px: '4px'
  }
};

export default styles;
