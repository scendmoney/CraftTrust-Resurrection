import { colors } from 'mui/theme/colors';
const styles = (isMobile: boolean, openMobileChat: boolean) => {
  return {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 2.5fr 1.25fr',
      height: '100%',
      '@media only screen and (max-width: 1050px)': {
        gridTemplateColumns: '1fr'
      }
    },
    form: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      p: 'clamp(16px, 1.786vw, 320px)',
      flexGrow: 1,

      height: '98vh',
      overflowY: isMobile ? 'visible' : 'auto'
    },
    chat: {
      backgroundColor: colors.gray1,

      display: isMobile && openMobileChat ? 'flex' : isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      position: isMobile ? 'fixed' : 'relative',

      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 20
    }
  };
};

export default styles;
