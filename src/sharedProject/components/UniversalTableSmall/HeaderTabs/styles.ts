import { colors } from 'mui/theme/colors';

const styles = {
  tabsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottom: `1px solid ${colors.gray4}`
  },
  refetch: {
    width: 'min-content',
    height: 'min-content'
  }
};

export default styles;
