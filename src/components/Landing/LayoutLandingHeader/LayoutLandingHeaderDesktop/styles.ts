import { display } from '@mui/system';
import { colors } from 'mui/theme/colors';

const styles = {
  header: {
    position: 'fixed',
    top: 'clamp(20px, 1.4vw, 200px)',
    left: 'clamp(20px, 2.326vw, 200px)',
    right: 'clamp(20px, 2.326vw, 200px)',
    display: 'grid',
    gridTemplateColumns: '1fr minmax(280px, auto) 1fr',
    // background: colors.black,
    justifyContent: 'space-between',
    color: colors.white,
    alignItems: 'center',
    zIndex: 9,
    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr'
    }
  },
  headerMenu: {
    backgroundColor: '#1E1E1Edd',
    backdropFilter: 'saturate(240%) blur(4px)',
    borderRadius: '100px',
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '>button': {
      padding: 'clamp(12px, 1.2vw, 120px);',
      borderRadius: '100px',
      fontSize: 'clamp(12px, 0.93vw, 120px)',
      lineHeight: '100%'
    }
  },
  badge: {
    position: 'fixed',
    bottom: 'clamp(20px, 1.4vw, 200px)',
    right: 'clamp(20px, 2vw, 200px)',
    zIndex: '10',
    width: '140px',
    height: '56px'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '>button': {
      padding: 'clamp(12px, 1.2vw, 120px);',
      borderRadius: '100px',
      fontSize: 'clamp(12px, 0.93vw, 120px)',
      lineHeight: '100%',
      backgroundColor: colors.green
    }
  }
};

export default styles;
