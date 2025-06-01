import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 2,
    px: 1,
    py: 2,
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
      backgroundColor: colors.gray1,
      border: 'none',
      p: '8px 16px',
      borderRadius: '12px',

      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      }
    },
    '& .MuiInputBase-root::before': {
      content: 'none'
    }
  },

  badge: {
    span: {
      top: '6px',
      right: '6px'
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
};

export default styles;
