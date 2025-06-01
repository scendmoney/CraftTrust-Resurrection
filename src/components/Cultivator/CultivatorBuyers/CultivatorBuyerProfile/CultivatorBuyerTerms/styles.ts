import { colors } from 'mui/theme/colors';

const styles = (isNetActivated: boolean) => {
  return {
    container: {
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: '1fr 0.2fr 2.5fr 2.5fr'
      }
    },
    wrapper: {
      mt: 3
    },
    netTerms: {
      display: 'flex',
      width: {
        xs: '100%',
        sm: '100%'
      },

      flexDirection: 'column',
      borderRadius: '12px;',
      border: `1px solid ${colors.gray4}`,
      padding: isNetActivated ? '12px 16px 0 16px' : '12px 16px'
    },
    terms: {
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      my: 2
    },
    divider: {
      display: {
        xs: 'none',
        sm: 'grid'
      },
      justifyContent: 'center',
      py: 3
    }
  };
};

export default styles;
