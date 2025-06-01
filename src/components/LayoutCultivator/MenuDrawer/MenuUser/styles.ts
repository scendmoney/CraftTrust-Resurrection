import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black1,
    padding: '8px',
    borderRadius: '12px',
    cursor: 'pointer'
  },
  title: {
    fontSize: '14px'
  },
  caption: {
    fontSize: '10px'
  },
  avatarUser: {
    position: 'absolute',
    zIndex: 2,
    left: '20px',
    border: '2px solid black'
  },
  avatarFacility: {
    position: 'absolute',
    zIndex: 2,
    left: '0px',
    border: '2px solid black'
  },
  avatarsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 60px',
    position: 'relative'
  }
};
export default styles;
