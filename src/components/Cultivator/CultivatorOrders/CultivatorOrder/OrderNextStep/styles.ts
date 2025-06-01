import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    position: 'fixed',
    bottom: '10px',
    left: '50%',
    right: 0,
    zIndex: 100,
    transform: 'translateX(-50%)',
    backgroundColor: '#1E1E1Ecc',
    backdropFilter: 'saturate(180%) blur(4px)',
    padding: '12px 12px 12px 24px',

    gap: 1,
    borderRadius: '24px',
    width: 'clamp(280px, 38vw, 2800px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s',
    '@media only screen and (max-width: 1400px)': {
      padding: '12px',
      left: '2vw',
      transform: 'translateX(0)'
    },
    '@media only screen and (max-width: 1050px)': {
      transform: 'translateX(-50%)',
      left: '50%',
      width: '80%'
    }
  },
  inputNumber: {
    border: 0,
    backgroundColor: colors.gray1,
    fontSize: '16px',
    textAlign: 'center',
    borderRadius: '12px',
    padding: '12px 16px'
  }
};

export default styles;
