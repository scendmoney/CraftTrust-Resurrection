import { colors } from 'mui/theme/colors';

const styles = {
  picker: {},
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: colors.black1,
    opacity: '50%',
    pb: 1
  },

  inputContainer: {
    '.MuiInputBase-root': {
      backgroundColor: '#eee',
      border: 'none',
      fontSize: '16px',

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
  required: {
    display: 'flex',
    gap: 0.5
  }
};

export default styles;
