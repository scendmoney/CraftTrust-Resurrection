import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean, disabled: boolean) => {
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
      backgroundColor: disabled ? colors.white : isSelected ? colors.black : colors.white,
      cursor: disabled ? 'default' : isSelected ? 'default' : 'pointer',
      ':hover': {
        backgroundColor: disabled ? colors.white : isSelected ? colors.black : 'rgba(0, 0, 0, 0.10)'
      }
    },
    subtitle: {
      color: '#979797'
    },
    titleWrapper: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    title: {
      transition: 'all 0.3s ease-in-out',
      color: disabled ? '#979797' : isSelected ? colors.white : colors.black
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
