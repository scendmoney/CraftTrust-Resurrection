import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 2fr 2fr',
    height: '100%',

    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr'
    }
  },
  productWrapper: {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: colors.gray1,
    p: 'clamp(24px, 2.679vw, 48px)',
    gap: '24px'
  },
  storeFrontWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    pb: {
      xs: '130px',
      sm: '130px',
      md: 'clamp(24px, 2.679vw, 48px)'
    },
    pt: 'clamp(24px, 2.679vw, 48px)',
    px: 'clamp(24px, 2.679vw, 48px)',
    gap: '24px',
    borderLeft: {
      xs: 'none',
      sm: 'none',
      md: `1px solid ${colors.gray1}`
    },
    borderTop: {
      xs: `1px solid ${colors.gray1}`,
      sm: `1px solid ${colors.gray1}`,
      md: 'none'
    }
  },
  storeFormWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '24px'
  },
  column: {
    display: 'flex',
    flexDirection: {
      xs: 'row',
      sm: 'column'
    },
    gap: '14px'
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

export default styles;
