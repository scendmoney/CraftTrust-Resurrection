import { colors } from 'mui/theme/colors';

const styles = (whiteBackground: boolean) => {
  return {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    icon: {
      backgroundColor: whiteBackground ? colors.white : colors.black1,
      padding: 'clamp(10px, 0.558vw, 100px)',
      borderRadius: 'clamp(40px, 2.23vw, 400px)',
      width: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '48px',
      '& svg': {
        width: '24px',
        height: '24px'
      }
    },
    items: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  };
};

export default styles;
