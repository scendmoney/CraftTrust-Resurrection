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
  assigneeWrapper: {
    display: 'flex',
    alignItems: 'center',
    p: 1,
    borderRadius: '12px',
    border: `1px solid ${colors.gray3}`,
    gap: 1
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: colors.black1,
    opacity: '50%',
    pb: 1
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5
  }
};

export default styles;
