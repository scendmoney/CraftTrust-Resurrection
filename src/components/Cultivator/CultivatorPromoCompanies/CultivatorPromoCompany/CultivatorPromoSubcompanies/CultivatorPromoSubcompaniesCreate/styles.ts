import { colors } from 'mui/theme/colors';

const styles = {
  dialog: {
    '& .MuiDialogContent-root': {
      p: 4
    },
    '& .MuiDialog-paper': {
      background: 'transparent',
      borderRadius: 0
    }
  },
  block: {
    backgroundColor: colors.white,
    borderRadius: '12px'
  },
  actions: {
    padding: 4,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 1
  },
  title: {
    p: 4,
    pb: 4
  },
  selected: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    borderRadius: '12px',
    padding: '12px 16px',
    backgroundColor: colors.white
  },
  dates: {
    display: 'flex',
    gap: 1
  }
};

export default styles;
