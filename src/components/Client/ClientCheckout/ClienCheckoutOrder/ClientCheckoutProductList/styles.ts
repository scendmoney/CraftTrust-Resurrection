import { colors } from 'mui/theme/colors';

const styles = {
  productWrapper: {
    display: 'flex',

    alignItems: 'flex-start',
    width: '100%',
    gap: '16px',
    pb: '16px',
    borderBottom: `1px solid ${colors.gray4}`,
    '&:last-of-type': {
      borderColor: 'transparent'
    }
  },
  productInfoWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    gap: '8px',
    justifyContent: 'space-between',
    width: '100%'
  },
  productName: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    pt: 1,
    gap: '8px'
  },
  productPrice: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: {
      xs: 'flex-start',
      sm: 'flex-end'
    }
  },
  iconDelete: {
    '& svg': {
      width: '16px',
      height: '16px'
    }
  },
  counterWrapper: {
    display: 'flex',
    gap: '4px'
  }
};

export default styles;
