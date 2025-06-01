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
    overflowY: 'auto',
    maxHeight: '98vh',
    '@media only screen and (max-width: 1050px)': {
      maxHeight: 'max-content'
    },
    padding: '24px',
    gap: 2
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
  id: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    justifyContent: 'space-between'
  },
  assigneeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 1
  },
  alertWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  assignee: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  status: {
    display: 'flex',
    gap: '8px',
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
  purchaseWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: '12px',
    px: 2
  },
  itemsWrapper: { display: 'flex', justifyContent: 'space-between', gap: 0.5 }
};
export default styles;
