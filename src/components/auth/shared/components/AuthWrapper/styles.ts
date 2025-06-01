import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: colors.gray1,
    backgroundImage: 'url("/resources/svg/authBackground.svg");',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right -300px bottom -200px',
    backgroundSize: 'contain',
    '@media only screen and (max-width: 900px)': {
      backgroundPosition: 'right -200px bottom -100px',
      backgroundSize: 'contain'
    },
    '@media only screen and (max-width: 400px)': {
      backgroundPosition: 'right -100px bottom 0px',
      backgroundSize: 'contain'
    },
    gap: 3,
    pb: 4
  }
};

export default styles;
