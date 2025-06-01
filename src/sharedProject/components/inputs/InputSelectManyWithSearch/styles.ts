import { colors } from 'mui/theme/colors';

const styles = (readOnly: boolean, isDark: boolean) => {
  return {
    selectedGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      mb: 1
    },
    selected: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      borderRadius: '12px',
      padding: '12px 16px',
      backgroundColor: readOnly ? 'transparent' : colors.gray1,
      border: `1px solid ${readOnly ? colors.gray4 : colors.gray1}`
    },
    menu: {
      '.MuiModal-backdrop': {
        background: 'rgb(0 0 0 / 0%)',
        backdropFilter: 'blur(0px)'
      }
    },
    fakeInput: {
      borderRadius: '12px',
      padding: '12px 16px',
      fontWeight: 400,
      height: '56px',
      backgroundColor: readOnly ? colors.white : colors.gray1,
      fontSize: '16px',
      border: `1px solid ${readOnly ? colors.gray4 : colors.gray1}`,
      input: {
        padding: 0
      }
    },
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
    searchInput: {
      backgroundColor: colors.white
    },
    menuItems: {
      height: '20vh',
      minWidth: '430px',

      overflowY: 'auto',
      '@media only screen and (max-height: 470px)': {
        height: 'initial'
      },
      '@media only screen and (max-width: 500px)': {
        width: '100%'
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
    },
    required: {
      display: 'flex',
      gap: 0.5
    }
  };
};

export default styles;
