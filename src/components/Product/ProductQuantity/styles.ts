import { colors } from 'mui/theme/colors';

const styles = {
  divider: {
    mt: '16px',
    mb: '16px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    p: '24px',
    backgroundColor: colors.white,
    borderRadius: '12px',
    mt: '16px'
  },
  containerMobile: {
    display: 'flex',
    position: 'fixed',
    backgroundColor: colors.white,
    zIndex: 1000,
    boxShadow: '0 -8px 15px rgb(0 0 0 / 15%)',
    left: 0,
    bottom: '-8px',
    width: '100%',
    flexDirection: 'column',
    p: '24px',
    borderRadius: '12px'
  },
  availableWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap'
  },
  availableWrapperMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '16px',
    alignItems: 'center'
  },
  priceWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px'
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  }
};

export default styles;
