import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    tab: {
      textTransform: 'initial',
      p: 'clamp(12px, 1.38vw, 24px) clamp(6px, 0.6vw, 12px)',
      m: 0,
      borderBottom: isSelected ? `1px solid ${colors.secondary}` : 'none',
      borderRadius: 0,
      color: isSelected ? colors.black : 'rgba(0, 0, 0, 0.5)',
      fontWeight: 500,
      fontSize: '24px',
      minWidth: 'auto',
      height: '60px',
      lineHeight: '100%',
      letterSpace: '-4%',
      '&:first-of-type': {
        py: 'clamp(12px, 1.38vw, 24px)',
        pr: 'clamp(6px, 0.6vw, 12px)',
        pl: '2px'
      }
    }
  };
};
export default styles;
