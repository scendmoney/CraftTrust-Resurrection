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
  form: {
    display: 'flex',
    flexDirection: 'column',
    p: 4,
    flexGrow: 1,
    mb: {
      xs: 8,
      sm: 6,
      md: 2
    }
  },
  facilityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    pb: 2
  },
  tableWrapper: {
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  cached: { display: 'flex', alignSelf: 'flex-end' },
  storeFrontWrapper: {
    display: 'flex',
    width: '100%',
    overflowX: 'hidden',

    minHeight: {
      xs: '50vh',
      sm: '50vh',
      md: '98vh'
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
  }
};

export default styles;
