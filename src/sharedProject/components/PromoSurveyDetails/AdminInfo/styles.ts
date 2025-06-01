import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    backgroundColor: colors.gray1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px'
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
      mt: 3
    },
    gap: 3
  },
  statusBlock: {
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    gap: 3,
    backgroundColor: colors.white,
    borderRadius: '12px'
  },
  id: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  assigneeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  assignee: {
    display: 'flex',
    flexDirection: 'column',
    px: '16px',
    gap: 1
  }
};

export default styles;
