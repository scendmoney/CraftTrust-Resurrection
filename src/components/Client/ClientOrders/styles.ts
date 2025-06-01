import { colors } from 'mui/theme/colors';

const styles = (isNoOverdueOrders: boolean) => {
  return {
    wrapper: {
      p: 'clamp(24px, 2.68vw, 48px)',
      display: 'flex',
      flexDirection: 'column'
    },
    orders: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    },
    blockWrapper: {
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'column',
        md: 'column',
        lg: 'row'
      },
      gap: {
        xs: 2,
        sm: 4,
        md: 'clamp(24px, 8vw, 480px)'
      },
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      mt: 'clamp(32px, 2.68vw, 480px)'
    },
    cardAction: {
      borderRadius: '12px'
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '24px'
    },
    cultivatorOrderWraper: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '12px',
      border: '1px solid rgba(0, 0, 0, 0.10)',
      padding: '24px',
      width: '100%'
    },
    dueWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: '16px',
      borderRadius: '12px',
      padding: '24px',
      border: `1px solid ${isNoOverdueOrders ? colors.orange : colors.secondary}`,
      '& svg': {
        width: '32px',
        height: '32px'
      }
    },
    headerLine: {
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      mb: 3,
      flexWrap: 'wrap'
    }
  };
};

export default styles;
