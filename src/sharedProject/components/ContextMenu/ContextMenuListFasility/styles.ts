import { colors } from 'mui/theme/colors';

const styles = {
  facilityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: '12px',
    px: '4px',
    py: '4px',
    gap: '8px'
  },
  facilityAvatar: {
    border: '2px solid white',
    width: 'clamp(32px, 1.786vw, 320px)',
    height: 'clamp(32px, 1.786vw, 320px)'
  },
  nameWrapper: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  name: {
    color: colors.black
  }
};
export default styles;
