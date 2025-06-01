import { OrderStatusEnum, PaymentStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';

const styles = (
  paymentStatus: PaymentStatusEnum,
  orderStatus: OrderStatusEnum,
  isShowPayButtonUm: boolean
) => {
  const cancelOrder = orderStatus === OrderStatusEnum.Cancel;
  const getBackgroundColor = () => {
    const baseColor = colors.gray1;
    if (paymentStatus === PaymentStatusEnum.Due && !cancelOrder) {
      return colors.orangeLight;
    } else if (paymentStatus === PaymentStatusEnum.Overdue && !cancelOrder) {
      return colors.redLight;
    } else if (paymentStatus === PaymentStatusEnum.Paid) {
      return colors.greenLight;
    } else {
      return baseColor;
    }
  };
  return {
    productWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '16px',
      borderRadius: '12px',
      padding: '16px',
      border: `1px solid ${colors.gray4}`
    },
    cardAction: {
      borderRadius: '12px'
    },
    productInfoWrapper: {
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'row'
      },
      gap: {
        xs: '16px',
        sm: 0
      },
      justifyContent: 'space-between',
      width: '100%'
    },
    productName: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    productsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'flex-start'
    },
    productItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: '16px'
    },
    orderWrapper: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      px: 2,
      gap: 'clamp(16px, 1.5vw, 24px)',
      '@media only screen and (max-width: 1050px)': {
        gridTemplateColumns: '1fr 1fr'
      },
      '@media only screen and (max-width: 600px)': {
        gridTemplateColumns: '1fr'
      },
      justifyContent: 'space-between'
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    codeWrapper: {
      display: 'flex',
      flexDirection: 'row',
      gap: '8px',
      color: colors.black1,
      alignItems: 'center',
      textAlign: 'center'
    },
    statusWrapper: {
      display: 'flex',
      flexDirection: 'row',
      gap: 1,
      alignItems: 'center'
    },
    headerWrapper: {
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'column',
        md: 'column',
        lg: 'row',
        xl: 'row'
      },
      flexWrap: 'wrap',
      gap: 2,
      justifyContent: 'space-between'
    },
    groupWrapper: {
      display: 'flex',
      gap: 2,
      flexDirection: {
        xs: 'column',
        sm: 'row'
      },
      alignItems: {
        xs: 'flex-start',
        sm: 'center'
      },
      flexWrap: 'wrap'
    },
    groupDividerWrapper: {
      display: 'flex',
      gap: 2,
      flexDirection: {
        xs: 'row',
        sm: 'row'
      },
      justifyContent: {
        xs: 'space-between',
        sm: 'inherit'
      },
      width: {
        xs: '100%',
        sm: 'auto'
      }
    },
    colorWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      backgroundColor: getBackgroundColor,
      padding: '16px',
      borderRadius: '12px'
    },
    divider: {
      display: {
        xs: isShowPayButtonUm ? 'flex' : 'none',
        sm: isShowPayButtonUm || !cancelOrder ? 'flex' : 'none',
        md: 'flex'
      }
    }
  };
};

export default styles;
