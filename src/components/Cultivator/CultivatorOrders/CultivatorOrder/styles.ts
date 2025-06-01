import { colors } from 'mui/theme/colors';
const styles = (isMobile: boolean, openMobileChat: boolean) => {
  return {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1.25fr',

      '@media only screen and (max-width: 1050px)': {
        gridTemplateColumns: '1fr'
      }
    },
    items: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    totalWrapper: {
      px: '20px',
      display: 'flex',
      flexDirection: 'column'
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
      flexGrow: 1,
      display: isMobile && openMobileChat ? 'flex' : isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      position: isMobile ? 'fixed' : 'relative',

      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: isMobile ? 120 : 20
    },
    facilityList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      pb: 2
    }
  };
};

export default styles;
