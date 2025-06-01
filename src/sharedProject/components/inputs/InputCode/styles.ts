import { colors } from 'mui/theme/colors';

const styles = () => {
  return {
    inputNumber: {
      border: 0,
      backgroundColor: colors.gray1,
      fontSize: '14px',
      textAlign: 'center',
      borderRadius: '12px',
      padding: '8px 12px',
      '@media only screen and (max-width: 768px)': {
        padding: '8px 2px'
      }
      // width: '12vw', // Устанавливаем ширину в относительных едниицах
      // maxWidth: '50px' // Ограничиваем максимальную ширину
    },
    label: {
      fontSize: '12px',
      fontWeight: 500,
      color: colors.black1,
      opacity: '50%',
      pb: 1
    },
    block: {
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1,
      alignItems: 'flex-start'
    },
    required: {
      display: 'flex',
      gap: 0.5,
      alignItems: 'center'
    },
    container: {
      gap: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s',
      width: '100%'
    }
  };
};

export default styles;
