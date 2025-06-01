import { colors } from 'mui/theme/colors';

const styles = {
  menu: {},
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: colors.black1,
    opacity: '50%',
    pb: 1
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  searchInput: {
    backgroundColor: colors.white,
    px: 2
  },
  menuItems: {
    width: '30vw',
    height: '30vh',

    minWidth: '430px',

    overflowY: 'auto',
    '@media only screen and (max-height: 470px)': {
      height: 'initial'
    },
    '@media only screen and (max-width: 500px)': {
      width: '100%'
    }
  },
  terpene: {
    py: 'clamp(4px, 0.4vw, 40px)',
    px: 'clamp(8px, 0.8vw, 80px)',
    borderBottom: `1px solid ${colors.gray1}`,
    textAlign: 'left',
    textTransform: 'initial',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:last-of-type': {
      borderColor: 'transparent'
    }
  },
  icon: {
    width: 'clamp(24px, 1.395vw, 240px)',
    height: 'clamp(24px, 1.395vw, 240px)'
  }
};
export default styles;
