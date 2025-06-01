import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: { position: 'relative' },

  menu: {
    backgroundColor: '#fff'
    // display: 'flex',
    // flexDirection: 'column',
    // maxHeight: '80vh',
    // overflowY: 'auto'
  },

  menuItem: {
    // display: 'flex',
    // flexDirection: 'column',
    // position: 'relative'
  },

  popover: {
    mt: 0.5,
    '& > div': {
      backdropFilter: 'blur(0)',
      background: 'transparent'
    }
  },

  popoverBlur: {
    mt: 0.5
  },

  btn: {
    willChange: 'transform'
  },

  button: {
    minWidth: 'max-content',

    padding: '12px 14px',
    fontSize: '16px',
    borderRadius: '12px',

    lineHeight: '120%',
    backgroundColor: colors.black1,
    color: colors.white,
    fontWeight: 500,
    border: `1px solid transparent`,
    textTransform: 'initial',
    '@media only screen and (max-width: 400px)': {
      padding: '6px 6px',
      fontSize: '12px'
    },
    '&:hover': {
      backgroundColor: colors.black1
    }
  }
};

export default styles;
