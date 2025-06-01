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
    p: '12px 16px',
    borderRadius: '12px',
    gap: 1,
    border: `1px solid ${colors.gray3}`
  },
  assignee: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  }
};

export default styles;
