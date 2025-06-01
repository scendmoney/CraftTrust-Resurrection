import { colors } from 'mui/theme/colors';

const styles = (isProductPage: boolean, isCartMobilePage: boolean) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: isProductPage || isCartMobilePage ? colors.gray1 : colors.white,
      flexGrow: 'inherit'
    },
    children: {
      flexGrow: 1
    }
  };
};

export default styles;
