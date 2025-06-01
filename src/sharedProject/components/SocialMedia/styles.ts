import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    '@media only screen and (max-width: 450px)': {
      gap: 0,
      justifyContent: 'space-between',
      width: '100%'
    }
  },
  button: {
    color: colors.black1,
    '> svg': {
      fill: colors.black1,
      ':hover': {
        fill: colors.secondary
      }
    }
  }
};

export default styles;
