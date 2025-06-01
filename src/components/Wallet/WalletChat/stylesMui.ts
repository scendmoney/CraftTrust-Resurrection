import { colors } from 'mui/theme/colors';

const styles = () => {
  return {
    chat: {
      position: 'sticky',
      height: 'calc(100vh - 56px - 51px)',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    },
    inputZone: {
      height: '50px',
      display: 'flex',
      alignItems: 'center',

      position: 'absolute',
      bottom: '48px',
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
