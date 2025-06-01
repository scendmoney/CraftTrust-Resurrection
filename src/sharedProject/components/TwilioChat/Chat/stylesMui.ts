import { colors } from 'mui/theme/colors';

const styles = (isOnCultivator: boolean) => {
  return {
    chat: {
      position: 'sticky',
      height: isOnCultivator ? '100vh' : '98vh',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      '@media only screen and (max-width: 1000px)': {
        height: '100%'
      }
    },
    inputZone: {
      height: '50px',
      display: 'flex',
      alignItems: 'center',

      position: 'absolute',
      bottom: '16px',
      left: '12px',
      right: '18px',
      borderRadius: '12px',
      backgroundColor: colors.white
    },
    input: {
      p: '12px 6px',
      fontSize: '16px'
    }
  };
};

export default styles;
