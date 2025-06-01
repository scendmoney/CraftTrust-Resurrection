import { colors } from 'mui/theme/colors';

const styles = (isSelected: boolean) => {
  return {
    imgWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2vh',
      p: '8px',
      border: isSelected ? `2px solid ${colors.secondary}` : `2px solid #EFEFEF`,
      backgroundColor: isSelected ? '#fff' : '#EFEFEF',
      borderRadius: '14px',
      cursor: 'pointer',
      aspectRatio: '3 / 4'
    },
    thumbnail: {
      width: '92px',
      height: 'auto',

      backgroundColor: 'transparent',

      objectFit: 'contain'
    }
  };
};

export default styles;
