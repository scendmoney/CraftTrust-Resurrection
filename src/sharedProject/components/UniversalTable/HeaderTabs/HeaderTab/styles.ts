import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    tab: {
      textTransform: 'initial',
      py: 2,
      px: 0,
      m: 0,
      borderBottom: isSelected ? `2px solid ${colors.secondary}` : `2px solid transparent`,
      borderRadius: 0,
      color: isSelected ? colors.secondary : colors.black1,
      fontWeight: 500,
      fontSize: '16px',
      minWidth: 'max-content',
      height: '60px',
      lineHeight: '100%',
      letterSpace: '-4%'
    }
  };
};
export default styles;
