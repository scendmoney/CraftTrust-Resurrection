import { colors } from 'mui/theme/colors';

const styles = (readOnly: boolean) => {
  return {
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
      mb: 1
    },
    input: {
      '.MuiSelect-select': {
        display: 'flex',
        cursor: readOnly ? 'auto' : 'pointer',
        alignItems: 'center',
        gap: 1
      },
      borderRadius: '12px',
      fontWeight: 400,
      backgroundColor: colors.black,
      color: colors.white,
      fontSize: '16px',

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
        fill: readOnly ? 'transparent' : colors.gray5
      },
      '.MuiOutlinedInput-input': {
        py: '12px'
      }
    },
    item: {
      display: 'flex',
      gap: 1
    }
  };
};

export default styles;
