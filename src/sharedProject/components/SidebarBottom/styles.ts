import { colors } from 'mui/theme/colors';

const styles = (
  isFullwidth: boolean,
  isOverflowHidden: boolean,
  isMobile: boolean,
  isSmallWidth: boolean
) => {
  const calculateWidth = () => {
    const baseWidth = 'clamp(280px, 71.759vw, 4800px)';
    if (isFullwidth) {
      return 'clamp(280px, 98vw, 4800px)';
    } else if (isSmallWidth) {
      return isMobile ? baseWidth : 'clamp(280px, 55vw, 4800px)';
    } else {
      return baseWidth;
    }
  };
  return {
    drawer: {
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        borderRadius: '16px 16px 0 0',
        border: `none`,
        boxShadow: 'none',
        backgroundColor: colors.white,
        margin: '0 auto',
        width: calculateWidth(),
        height: '98vh',
        overflow: isOverflowHidden && isMobile ? 'auto' : isOverflowHidden ? 'hidden' : 'auto'
      },
      '& .MuiModal-backdrop': {
        background: 'rgb(0 0 0 / 80%)',
        backdropFilter: 'blur(4px)'
      }
    }
  };
};
export default styles;
