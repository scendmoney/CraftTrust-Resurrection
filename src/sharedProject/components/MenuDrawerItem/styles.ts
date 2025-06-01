import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    listItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      px: 1,

      borderRadius: 0,
      color: isSelected ? colors.black : colors.gray2,
      textTransform: 'initial',
      py: 1.5,
      svg: {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
        color: isSelected ? colors.red : colors.gray2
      }
    },
    badge: {
      span: {
        top: '0px',
        right: '-8px'
      }
    }
  };
};

export default styles;
