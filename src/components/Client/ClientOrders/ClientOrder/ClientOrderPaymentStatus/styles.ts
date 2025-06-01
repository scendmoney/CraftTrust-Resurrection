import { PaymentStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';

const styles = (paymentStatus: PaymentStatusEnum, showBorder: boolean) => {
  let button: {
    border: string;
    p: string;
  } = {
    border: `1px solid ${colors.orange}`,
    p: '8px'
  };

  if (paymentStatus === PaymentStatusEnum.Due) {
    button = {
      border: `1px solid ${colors.orange}`,
      p: '8px'
    };
  }
  if (paymentStatus === PaymentStatusEnum.Paid) {
    button = {
      border: showBorder ? `1px solid ${colors.green}` : 'null',
      p: showBorder ? '8px' : 'null'
    };
  }
  if (paymentStatus === PaymentStatusEnum.Overdue) {
    button = {
      border: `1px solid ${colors.red}`,
      p: '8px'
    };
  }

  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: 1
    },
    button: {
      textAlign: 'center',
      display: 'flex',
      borderRadius: '12px',

      // p: '8px',

      gap: '8px',
      alignItems: 'center',
      justifyContent: 'center',
      ...button
    }
  };
};

export default styles;
