import { colors } from 'mui/theme/colors';

const styles = {
  searchInput: {
    position: 'relative',
    borderRadius: '12px',
    py: '12px',
    px: 'clamp(16px, 0.9vw, 160px)',
    zIndex: 100,
    backgroundColor: colors.black,
    transition: 'background-color 0.3s',
    '& input': {
      letterSpacing: 'unset',
      fontSize: '16px',
      color: colors.white,
      padding: '0px',
      '&::placeholder': {
        color: colors.white,
        opacity: 1
      }
    },
    '& svg': {
      width: '24px',
      height: '24px'
    },
    '&:focus-within': {
      backgroundColor: colors.white,
      border: '1px solid red',
      boxShadow:
        '0px 0px 0px 0px rgba(0, 0, 0, 0.10), 2px 13px 29px 0px rgba(0, 0, 0, 0.10), 7px 52px 53px 0px rgba(0, 0, 0, 0.09), 16px 117px 71px 0px rgba(0, 0, 0, 0.05), 29px 208px 84px 0px rgba(0, 0, 0, 0.01), 45px 326px 92px 0px rgba(0, 0, 0, 0.00)',
      color: colors.black,
      '& input': {
        color: colors.black,
        '&::placeholder': {
          color: colors.black,
          opacity: 1
        }
      },
      '& svg': {
        color: colors.gray2
      },
      '&::placeholder': {
        color: colors.black,
        opacity: 1
      }
    },
    width: {
      xs: '100%',
      sm: 'clamp(220px, 46vw, 880px)',
      md: 'clamp(220px, 30vw, 880px)',
      lg: 'clamp(220px, 45vw, 2200px)'
    }
  }
};

export default styles;
