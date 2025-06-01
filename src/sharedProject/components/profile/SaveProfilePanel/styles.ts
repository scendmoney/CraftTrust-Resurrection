import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    position: 'fixed',
    bottom: '10px',
    left: '50%',
    right: 0,
    zIndex: 1200,
    transform: 'translateX(-50%)',
    backgroundColor: colors.black1,
    padding: '12px 12px 12px 24px',
    flexWrap: 'wrap',
    gap: 1,
    borderRadius: '24px',
    width: 'clamp(300px, 48vw, 2800px)',
    '@media only screen and (max-width: 800px)': {
      width: '90%'
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media only screen and (max-width: 768px)': {
      padding: '18px'
    }
  }
};

export default styles;
