import { colors } from 'mui/theme/colors';

const styles = {
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: colors.black1,
    opacity: '50%',
    pb: 1
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: 0,
    px: 0
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 2,
    p: 2,
    width: '15vw',
    '@media only screen and (max-width: 1600px)': {
      width: '240px'
    }
  },
  datePickers: {
    display: 'flex',
    gap: 2,
    flexDirection: 'column'
  },

  inputContainer: {
    width: '100%',
    '.MuiInputBase-root': {
      backgroundColor: '#fff',
      border: 'none',

      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      }
    }
  },

  badge: {
    span: {
      top: '6px',
      right: '6px'
    }
  }
};

export default styles;
