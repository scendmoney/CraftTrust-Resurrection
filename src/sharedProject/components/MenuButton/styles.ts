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
    backgroundColor: 'transparent',
    color: colors.black1,
    fontWeight: 500,
    border: `1px solid transparent`,
    textTransform: 'initial'
  }
};

export default styles;
