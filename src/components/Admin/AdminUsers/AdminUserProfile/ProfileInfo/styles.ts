import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    backgroundColor: colors.gray1,
    display: 'flex',
    flexDirection: 'column',

    '@media only screen and (max-width: 1050px)': {
      width: '100%'
    }
  },
  stickyBlock: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    maxHeight: '100vh',
    padding: '24px',
    gap: 3,
    '@media only screen and (max-width: 1050px)': {
      overflowY: 'hidden',
      maxHeight: 'max-content',
      pb: 3
    }
  },
  license: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center'
  },
  licenseIcon: { display: 'inline-block', verticalAlign: 'middle' }
};

export default styles;
