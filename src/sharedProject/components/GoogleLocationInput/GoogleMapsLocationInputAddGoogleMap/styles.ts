import { colors } from 'mui/theme/colors';

const styles = (showMap: boolean) => {
  return {
    map: {
      marginTop: '0px',
      marginBottom: '20px',
      height: '240px',
      width: '100%',
      display: showMap ? 'flex' : 'none',
      borderRadius: '12px',
      boxShadow: '0px 20px 10px #00000020'
    },
    autoCompleteWrapper: {
      button: {
        backgroundColor: colors.gray1,
        '&:hover': {
          backgroundColor: colors.gray1
        }
      }
    },
    input: {
      borderRadius: '12px',
      padding: '8px 16px',
      fontWeight: 400,
      backgroundColor: colors.gray1,
      fontSize: '16px',

      input: {
        padding: 0,
        height: '1.3em'
      }
    },
    inputWrapper: {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid transparent!important`
      }
    },
    paper: {
      boxShadow: '0 10px 25px rgb(0 0 0 / 10%)'
    }
  };
};

export default styles;
