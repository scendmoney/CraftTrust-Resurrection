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
    overflowY: 'auto',
    maxHeight: '100vh',
    padding: '32px',
    gap: '16px'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    py: 1
  }
};
export default styles;
