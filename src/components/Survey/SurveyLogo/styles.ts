import { colors } from 'mui/theme/colors';

const styles = {
  containerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,

    backgroundColor: '#00000055',
    backdropFilter: 'saturate(180%) blur(8px)',
    flexDirection: 'row',
    position: 'fixed',
    top: '0px',
    py: '10px',
    left: '0px',
    right: '0px',
    zIndex: 10,
    px: '18px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width: '500px'
  },
  text: {
    fontSize: '20px',
    lineHeight: '100%',
    fontWeight: '500',
    flexGrow: 1
  },
  logo: {
    width: '52px',
    height: '52px',
    objectFit: 'contain'
  }
};

export default styles;
