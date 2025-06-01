import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 'clamp(230px, 13.4vw, 2000px)',
    padding: '8px'
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    gap: '8px'
  },
  facilitiesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    gap: '8px'
  },
  facilityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderRadius: '12px',
    px: '8px',
    py: 'clamp(6px, 0.335vw, 60px)',
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
    alignItems: 'center',
    pb: '8px'
  },
  name: {
    color: colors.black
  },
  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    paddingTop: 0,
    gap: '8px',
    '& svg': {
      width: 'clamp(18px, 1.01vw, 180px)',
      height: 'clamp(18px, 1.01vw, 180px)'
    }
  },
  divider: {
    px: '8px',
    py: '16px'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '12px',
    px: '4px',
    py: '4px',
    gap: '8px',
    '& svg': {
      width: '24px',
      height: '24px'
    }
  }
};
export default styles;
