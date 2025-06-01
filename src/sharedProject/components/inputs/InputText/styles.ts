import { colors } from 'mui/theme/colors';

const styles = (readOnly: boolean) => {
  return {
    label: {
      fontSize: '12px',
      fontWeight: 500,
      color: colors.black1,
      opacity: '50%',
      pb: 1
    },
    block: {
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1,
      mb: 1
    },
    input: {
      borderRadius: '12px',
      padding: '12px 16px',
      fontWeight: 400,
      backgroundColor: readOnly ? colors.white : colors.gray1,
      fontSize: '16px',
      border: `1px solid ${readOnly ? colors.gray4 : colors.gray1}`,
      input: {
        padding: 0,
        height: '1.3em'
      }
    },
    required: {
      display: 'flex',
      gap: 0.5
    }
  };
};

export default styles;
