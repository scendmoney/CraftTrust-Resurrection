import { colors } from 'mui/theme/colors';

const styles = (readOnly: boolean, isDark: boolean) => {
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
        alignItems: 'center',
        gap: 1
      },
      borderRadius: '12px',
      fontWeight: 400,
      color: isDark ? colors.white : colors.black,
      backgroundColor: readOnly ? colors.white : isDark ? colors.black : colors.gray1,
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
      '.MuiSvgIcon-root ': {
        fill: isDark ? colors.gray5 : colors.secondary
      },
      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 0
      },
      '.MuiOutlinedInput-input': {
        py: '12px'
      }
    },
    item: {
      display: 'flex',
      gap: 1
    },
    avatar: {
      width: '24px',
      height: '24px',
      objectFit: 'cover',
      '.MuiSvgIcon-root ': {
        fill: colors.white
      }
    }
  };
};

export default styles;
