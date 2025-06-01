import { colors } from 'mui/theme/colors';

const styles = {
  tabs: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    display: 'flex',
    alignItems: 'flex-end',
    height: '90px',
    px: 0,
    width: '100%',
    overflowX: 'auto',
    borderBottom: `1px solid ${colors.gray4}`,
    backdropFilter: 'blur(4px)',
    backgroundColor: '#ffffff55'
  },
  emptyTabs: {
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90px',
    width: '100%',
    overflowX: 'auto',
    borderBottom: `1px solid ${colors.gray4}`,
    backdropFilter: 'blur(4px)',
    backgroundColor: '#ffffff55',
    p: '16px'
  },
  fullHeight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    p: 4,
    width: '100%',
    backgroundColor: '#fff',
    overflowY: 'auto'
  }
};

export default styles;
