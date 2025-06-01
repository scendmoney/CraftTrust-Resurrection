import { colors } from 'mui/theme/colors';

const styles = {
  productWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'row',
      sm: 'row'
    },

    width: '100%',
    gap: '24px',
    py: 2,
    borderBottom: `1px solid ${colors.gray4}`,
    '&:last-of-type': {
      borderColor: 'transparent'
    }
  },
  productInfoWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'row',
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
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%'
  },
  productPrice: {
    display: 'flex',
    flexDirection: 'column',
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
    flexWrap: 'wrap',
    width: {
      xs: '100%',
      sm: 'auto'
    }
  },
  thumbnail: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    backgroundColor: colors.gray1,
    borderRadius: '16px'
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
    gap: 1
  }
};

export default styles;
