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
  wrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row'
    },
    alignItems: {
      xs: 'center',
      sm: 'center',
      md: 'flex-start'
    },
    flexGrow: '1',
    justifyContent: 'space-between'
  },
  storeFrontWrapper: {
    display: 'flex',
    width: '100%',
    minHeight: {
      xs: 'auto',
      sm: 'auto',
      md: '97vh'
    },
    flexDirection: 'column',
    pb: {
      xs: 12,
      sm: 10,
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
