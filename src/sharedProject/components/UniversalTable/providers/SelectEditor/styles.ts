import { colors } from 'mui/theme/colors';

const styles = (isGray: boolean) => {
  return {
    input: {
      '.MuiSelect-select': {
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        color: isGray ? '#00000038' : 'initial'
      },
      fieldset: {
        border: 0,
        outline: 0
      },

      boxShadow: 'none',
      '.MuiOutlinedInput-notchedOutline': { border: 0 },
      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        border: 0
      },

      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 0
      },
      '> .MuiSvgIcon-root ': {
        fill: colors.gray5
      },
      '.MuiOutlinedInput-input': {
        py: '12px'
      }
    }
  };
};

export default styles;
