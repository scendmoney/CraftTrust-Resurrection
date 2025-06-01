import { colors } from 'mui/theme/colors';

const styles = {
  tabs: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    overflowY: 'auto',
    minWidth: 0,
    flexGrow: 1,
    borderRadius: '12px',
    backgroundColor: colors.white
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 0,
    maxWidth: '100%',
    width: {
      xs: 'calc(100% - 16px)',
      sm: 'calc(100% - 16px)',
      md: '255px',
      lg: `255px`
    }
  },
  emptyTabs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflowY: 'auto',
    p: '16px',
    flexGrow: 1,
    borderRadius: '12px',
    backgroundColor: colors.white
  }
};

export default styles;
