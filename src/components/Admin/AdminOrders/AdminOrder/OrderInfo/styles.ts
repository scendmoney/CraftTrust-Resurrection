import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    alignSelf: 'stretch',
    padding: 'clamp(24px, 1.395vw, 240px)',
    backgroundColor: colors.gray1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  titleContainer: {
    padding: 'clamp(16px, 0.930vw, 160px)',
    borderRadius: 'clamp(12px, 0.450vw, 120px)',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    '@media only screen and (max-width: 1050px)': {
      mt: 3
    }
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: colors.black1,
    color: colors.white,
    borderRadius: '12px',
    padding: 'clamp(12px, 0.698vw, 120px) clamp(16px, 0.930vw, 160px)',
    mt: 'clamp(12px, 0.698vw, 120px)'
  },
  buttonsWrapper: { display: 'flex', flexDirection: 'row', gap: 2, mt: 1 },
  assigneeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '12px',
    gap: 1,
    p: 0.5
  },
  assignee: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }
};

export default styles;
