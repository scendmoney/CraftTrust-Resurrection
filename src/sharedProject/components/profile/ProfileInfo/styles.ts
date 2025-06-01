import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    backgroundColor: colors.gray1,
    display: 'flex',
    flexDirection: 'column',

    width: '100%'
  },
  stickyBlock: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    maxHeight: '100vh',
    padding: '24px'
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
