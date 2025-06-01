import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      borderRadius: '12px',
      border: '1px solid rgba(0, 0, 0, 0.10)',
      padding: '24px',
      height: '100%',
      transition: 'all 0.3s ease-in-out',
      backgroundColor: isSelected ? colors.black : colors.white,
      cursor: isSelected ? 'default' : 'pointer',
      '@media only screen and (max-width: 400px)': {
        width: '100%'
      },
      ':hover': {
        backgroundColor: isSelected ? colors.black : 'rgba(0, 0, 0, 0.10)'
      }
    },
    titleWrapper: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    title: {
      transition: 'all 0.3s ease-in-out',
      color: isSelected ? colors.white : colors.black
    },
    deliveryIcon: {
      '& svg': {
        width: '48px',
        height: '48px'
      }
    }
  };
};

export default styles;
