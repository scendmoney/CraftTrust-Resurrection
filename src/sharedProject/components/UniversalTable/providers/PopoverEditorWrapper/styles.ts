import { colors } from 'mui/theme/colors';

const styles = (isOpen: boolean, isActive: boolean) => {
  let definedStyles;
  if (isOpen) {
    definedStyles = {
      color: colors.white,
      backgroundColor: colors.black,
      borderColor: colors.black
    };
  } else if (isActive) {
    definedStyles = {
      color: colors.white,
      backgroundColor: colors.secondary,
      borderColor: colors.secondary
    };
  } else {
    definedStyles = {
      color: colors.black,
      backgroundColor: colors.white,
      borderColor: colors.gray3
    };
  }

  return {
    wrapper: { position: 'relative' },

    button: {
      padding: '12px 14px',
      fontSize: '16px',
      minHeight: '10px',
      borderRadius: '12px',
      lineHeight: '100%',
      backgroundColor: definedStyles.backgroundColor,
      color: definedStyles.color,
      fontWeight: 500,
      border: `1px solid ${definedStyles.borderColor}`,
      textTransform: 'initial',
      '&:hover': {
        backgroundColor: colors.black1,
        color: colors.white
      }
    },
    menu: {
      backgroundColor: '#fff',
      p: 'clamp(12px, 0.926vw, 120px)'
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
    }
  };
};

export default styles;
