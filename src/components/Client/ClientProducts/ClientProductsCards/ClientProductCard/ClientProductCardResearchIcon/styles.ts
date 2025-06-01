import { colors } from 'mui/theme/colors';

const styles = {
  researchIconProgress: {
    borderRadius: 'clamp(40px, 2.232vw, 400px)',
    border: '1.5px solid #9B9B9B',
    backgroundColor: colors.gray1,
    display: 'flex',
    padding: 'clamp(10px, 0.558vw, 100px)',
    position: 'absolute',
    bottom: 'clamp(10px, 0.558vw, 100px)',
    left: 'clamp(10px, 0.558vw, 100px)',
    '& svg': {
      width: 'clamp(24px, 1.786vw, 320px)',
      height: 'clamp(24px, 1.786vw, 320px)'
    }
  },
  researchIconTested: {
    borderRadius: 'clamp(40px, 2.232vw, 400px)',
    border: `1.5px solid ${colors.black}`,
    backgroundColor: colors.black,
    display: 'flex',
    padding: 'clamp(10px, 0.558vw, 100px)',
    position: 'absolute',
    bottom: 'clamp(10px, 0.558vw, 100px)',
    left: 'clamp(10px, 0.558vw, 100px)',
    '& svg': {
      width: 'clamp(24px, 1.786vw, 320px)',
      height: 'clamp(24px, 1.786vw, 320px)'
    }
  }
};

export default styles;
