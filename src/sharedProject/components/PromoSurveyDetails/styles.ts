import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.5fr',
    height: '100%',
    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr'
    }
  },
  storeFrontWrapper: {
    display: 'flex',
    width: '100%',
    minHeight: {
      xs: '50vh',
      sm: '50vh',
      md: '97vh'
    },
    flexDirection: 'column',
    pb: {
      xs: '130px',
      sm: '130px',
      md: 'clamp(24px, 2.679vw, 48px)'
    },
    pt: 'clamp(24px, 2.679vw, 48px)',
    px: 'clamp(24px, 2.679vw, 48px)',
    gap: '24px',

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
  experience: {
    display: 'flex',
    gap: 1,
    alignItems: 'center'
  },
  img: {
    width: '32px',
    height: '32px'
  }
};

export default styles;
