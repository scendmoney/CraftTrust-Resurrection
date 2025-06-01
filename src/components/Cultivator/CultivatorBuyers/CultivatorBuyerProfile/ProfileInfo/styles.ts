import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    backgroundColor: colors.gray1,
    display: 'flex',
    flexDirection: 'column'
  },
  stickyBlock: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    maxHeight: '100vh',
    padding: '24px',
    '@media only screen and (max-width: 1050px)': {
      width: '100%'
    }
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '24px',
    my: 2,
    mx: 1
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
