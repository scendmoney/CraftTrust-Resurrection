import { colors } from 'mui/theme/colors';

const styles = () => {
  return {
    drawer: {
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        borderRadius: '16px',
        border: `none`,
        boxShadow: 'none',
        backgroundColor: colors.gray1,
        margin: '0 auto',
        width: 'clamp(280px, 71.759vw, 2800px)',
        height: '98vh',
        marginTop: '1vh',
        marginBottom: '1vh',
        marginRight: '1vh',
        overflow: 'hidden',
        '@media only screen and (max-width: 768px)': {
          width: '100%',
          margin: 0,
          height: '100%',
          marginTop: '0',
          marginBottom: '0',
          borderRadius: 0
        }
      },
      '& .MuiModal-backdrop': {
        background: 'rgb(0 0 0 / 80%)',
        backdropFilter: 'blur(4px)'
      }
    }
  };
};
export default styles;
