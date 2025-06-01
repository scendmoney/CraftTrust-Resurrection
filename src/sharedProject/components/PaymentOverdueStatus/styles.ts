import { colors } from 'mui/theme/colors';

const styles = (isSmall?: boolean) => {
  return {
    paymentStatus: {
      textAlign: 'center',
      display: 'flex',
      borderRadius: 'clamp(12px, 0.67vw, 120px)',

      p: 'clamp(8px, 0.446vw, 80px)',

      gap: 'clamp(8px, 0.446vw, 80px)',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: isSmall ? 'fit-content' : '100%',
      color: colors.red,
      border: `1px solid ${colors.red}`
    }
  };
};

export default styles;
