import { colors } from 'mui/theme/colors';

const styles = (lessPadding: boolean) => {
  return {
    container: {
      borderRadius: '12px',
      backgroundColor: colors.white,
      boxShadow:
        '0px 15px 33px 0px rgba(0, 0, 0, 0.07), 0px 59px 59px 0px rgba(0, 0, 0, 0.06), 0px 133px 80px 0px rgba(0, 0, 0, 0.03), 0px 237px 95px 0px rgba(0, 0, 0, 0.01), 0px 370px 104px 0px rgba(0, 0, 0, 0.00)',
      padding: 4,
      '@media only screen and (max-width: 768px)': {
        padding: 2
      },

      width: '530px',
      display: 'flex',
      flexDirection: 'column',
      '@media only screen and (max-width: 600px)': {
        width: '300px'
      }
    }
  };
};

export default styles;
