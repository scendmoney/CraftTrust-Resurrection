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
    maxHeight: '98vh',
    '@media only screen and (max-width: 1050px)': {
      maxHeight: 'max-content'
    },
    gap: 2,
    padding: '24px'
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  statusBlock: {
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    gap: 2,
    backgroundColor: colors.white,
    borderRadius: '12px',
    '@media only screen and (max-width: 1050px)': {
      mt: 3
    }
  },
  assigneeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    p: 0.5,
    gap: 1
  },
  facilityWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 1
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
  },
  strainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: '12px',
    border: `1px solid ${colors.gray4}`,
    padding: 2
  },

  itemsWrapper: { display: 'flex', justifyContent: 'space-between', gap: 0.5 }
};
export default styles;
