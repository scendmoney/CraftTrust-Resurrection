import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    button: {
      mx: 1,
      mt: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'left',
      borderRadius: '8px',
      maxWidth: '100%',
      textTransform: 'initial',
      color: isSelected ? colors.black : colors.gray2,
      span: {
        fontWeight: 500
      }
    },
    badge: {
      span: {
        outline: '2px solid #fff',
        bottom: '6px',
        right: '6px'
      }
    },
    newRoundNotification: {
      background: colors.red,
      borderRadius: '50%',
      width: '12px',
      height: '12px',
      overflow: 'hidden'
    }
  };
};
export default styles;
