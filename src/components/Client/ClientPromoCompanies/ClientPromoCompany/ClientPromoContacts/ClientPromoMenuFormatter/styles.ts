import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    minWidth: '300px'
  },
  menu: {
    color: colors.black,
    '& .MuiMenu-list': {
      width: '175px'
    },
    '& .MuiListItemText-primary': {
      color: colors.black,
      fontWeight: 500
    }
  }
};
export default styles;
