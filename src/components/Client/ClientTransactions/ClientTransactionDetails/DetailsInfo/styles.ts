import { colors } from 'mui/theme/colors';
const styles = {
  container: {
    backgroundColor: colors.gray1,
    display: 'flex',
    flexDirection: 'column',
    width: 'clamp(300px, 20vw, 3000px)',
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
    padding: '24px',
    gap: 2
  },
  statusBlock: {
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    gap: 3,
    backgroundColor: colors.white,
    borderRadius: '12px',
    mb: 1,
    '@media only screen and (max-width: 1050px)': {
      mt: 3
    }
  },
  id: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  assignee: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  status: {
    display: 'flex',
    gap: 1,
    borderRadius: '12px',
    backgroundColor: colors.black,
    color: colors.white,
    alignItems: 'center',
    padding: '12px 32px 12px 14px'
  }
};
export default styles;
