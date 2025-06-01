import { colors } from 'mui/theme/colors';

const styles = {
  sorting: {
    display: 'flex',
    alignItems: 'center',

    gap: '8px'
  },
  iconButton: {
    width: 'clamp(16px, 1.2vw, 240px)',
    height: 'clamp(16px, 1.2vw, 240px)'
  },
  divider: {
    height: 'clamp(20px, 1.6vw, 90px)',
    borderRight: `1px solid ${colors.gray3}`
  }
};
export default styles;
