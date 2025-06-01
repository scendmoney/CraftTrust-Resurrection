import { colors } from 'mui/theme/colors';

const styles = (hasTestDocs: boolean) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      p: '24px',
      border: '1px solid rgba(0, 0, 0, 0.10)',
      borderRadius: '12px',
      mt: '16px',
      gap: '24px'
    },
    labContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: '16px',
      py: '8px',
      gap: '8px',
      backgroundColor: colors.black,
      borderRadius: '12px',
      width: hasTestDocs ? 'inherit' : 'max-content'
    },
    labWrap: {
      flexWrap: {
        xs: 'wrap',
        sm: 'nowrap'
      },
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    labTitle: {
      fontSize: '16px',
      fontWeight: '700',
      maxWidth: '60px',
      color: colors.green,
      lineHeight: '90%',
      letterSpacing: '-0.72px'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      '& svg': {
        width: 'clamp(32px, 1.786vw, 320px)',
        height: 'clamp(32px, 1.786vw, 320px)'
      }
    },
    componentWrapper: {
      display: 'flex',
      justifyContent: 'space-between',

      flexDirection: {
        xs: 'column',
        sm: 'row'
      },
      gap: {
        xs: 2,
        sm: 0
      }
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 1
    },
    terpenes: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    terpene: {
      cursor: 'default',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };
};

export default styles;
