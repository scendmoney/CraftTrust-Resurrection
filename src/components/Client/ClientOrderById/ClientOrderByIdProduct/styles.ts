import { colors } from 'mui/theme/colors';

const styles = {
  productWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    width: '100%',
    gap: '16px',
    borderBottom: `1px solid ${colors.gray4}`,
    pb: 'clamp(16px, 1.34vw, 24px)',
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
    gap: {
      xs: '16px',
      sm: 0
    },
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%'
  },
  productName: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  productPrice: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'flex-end',
    '@media only screen and (max-width: 380px)': {
      alignItems: 'flex-start'
    }
  },
  iconDelete: {
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  counterWrapper: {
    display: 'flex',
    gap: '4px',
    justifyContent: {
      xs: 'space-between',
      sm: 'unset'
    },
    flexWrap: 'wrap'
  }
};

export default styles;
