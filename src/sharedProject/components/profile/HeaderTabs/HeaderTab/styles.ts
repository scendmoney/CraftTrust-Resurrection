import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    tab: {
      m: 0,
      borderBottom: isSelected ? `1px solid ${colors.secondary}` : `1px solid ${colors.gray4}`,
      borderRadius: 0,
      color: isSelected ? colors.black : colors.gray2,
      p: 'clamp(12px, 1.38vw, 24px) clamp(6px, 0.6vw, 12px)'
    }
  };
};
export default styles;
