import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.25fr 2.5fr 2.5fr',
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
    pb: 'clamp(48px, 8vw, 88px)',
    pt: 'clamp(24px, 2.679vw, 48px)',
    px: 'clamp(24px, 2.679vw, 48px)',
    '@media only screen and (max-width: 1050px)': {
      pb: 3
    },
    gap: '24px',
    borderRight: {
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
  }
};

export default styles;
