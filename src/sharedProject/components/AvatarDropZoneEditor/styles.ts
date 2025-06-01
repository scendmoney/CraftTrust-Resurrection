import { colors } from 'mui/theme/colors';

const styles = (isDragActive: boolean, isSquare?: boolean) => {
  return {
    container: { display: 'flex', gap: 2, alignItems: 'center' },
    dropZoneArea: {
      outline: isDragActive ? '5px solid #F6D509' : '5px solid transparent',

      border: `1px dashed ${colors.gray3}`,
      borderRadius: isSquare ? '12px' : '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'relative',
      width: isSquare ? 'clamp(200px, 11.1vw, 1000px)' : 'clamp(96px, 9.259vw, 960px)',
      height: isSquare ? 'clamp(200px, 11.1vw, 1000px)' : 'clamp(96px, 9.259vw, 960px)'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontSize: '16px',
      color: '#777',
      fontWeight: 'bold'
    },
    caption: {
      color: '#777'
    },
    image: {
      cursor: 'pointer',
      transform: 'translateY(30px)'
    },
    icon: {
      color: colors.gray2,

      svg: {
        transition: 'all 0.3s ease-in-out'
      }
    }
  };
};

export default styles;
