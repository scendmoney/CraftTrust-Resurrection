import { PaymentStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';

const styles = (paymentStatus: PaymentStatusEnum) => {
  return {
    container: {
      border:
        paymentStatus === PaymentStatusEnum.Paid
          ? `1px solid ${colors.green}`
          : `1px solid ${colors.orange}`,
      textAlign: 'center',
      display: 'flex',
      px: '20px',
      borderRadius: '12px',

      p: 'clamp(12px, 0.698vw, 120px) clamp(16px, 0.930vw, 160px)',

      my: 'clamp(16px, 0.930vw, 160px)',

      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center'
      // mt: 'clamp(24px, 2.679vw, 48px)'
    },
    facilityInfoWrapper: {
      display: 'flex',
      flexDirection: 'column',

      width: '100%',
      pr: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: '24px'
      }
      // pt: '24px'
    }
  };
};

export default styles;
