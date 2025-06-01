import { colors } from 'mui/theme/colors';

const styles = {
  pdfWrapper: {
    '& svg': {
      width: '24px',
      height: '24px'
    }
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '14px',
    px: '16px',
    py: '8px',
    border: `1px solid ${colors.green}`,
    borderRadius: '12px',
    '& svg': {
      width: '24px',
      height: '24px'
    }
  }
};

export default styles;
