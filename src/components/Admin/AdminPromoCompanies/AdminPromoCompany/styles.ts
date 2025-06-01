import { colors } from 'mui/theme/colors';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.5fr',

    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr'
    }
  },

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
      md: '24px'
    },
    pt: '32px',
    px: '24px',

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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2
  },
  facilityRole: {
    display: 'flex',
    gap: 2,
    backgroundColor: colors.black,
    color: colors.white,
    p: 3,
    alignItems: 'center',
    borderRadius: '12px',
    '& svg': {
      width: '48px',
      height: '48px'
    }
  }
};

export default styles;
