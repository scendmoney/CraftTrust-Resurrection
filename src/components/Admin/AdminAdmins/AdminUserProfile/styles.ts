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
    px: 4,
    pt: 4,
    flexGrow: 1,
    pb: {
      xs: 14,
      sm: 12,
      md: 8
    }
  },
  facilityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    pb: 2
  },
  terms: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    alignItems: 'center',
    p: 1.5,
    borderRadius: '12px',
    border: `1px solid ${colors.gray1}`
  },
  notificationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: 2,
      sm: 1
    }
  },
  notification: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    alignItems: 'center'
  }
};

export default styles;
