import { colors } from 'mui/theme/colors';

const styles = {
  dialog: {
    position: 'fixed',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050
  },
  wrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
      md: 'row'
    },
    backgroundColor: colors.white,
    position: 'relative',
    borderRadius: '12px',
    overflowY: 'auto',
    maxHeight: '90vh'
  },
  block: {
    width: {
      xs: 'clamp(280px, 75vw, 1290px)',
      sm: 'clamp(280px, 75vw, 516px)'
    },
    height: {
      xs: '515px',
      sm: '515px',
      md: '515px',
      lg: '640px'
    },
    borderRadius: '12px',
    gap: 2,
    backgroundColor: colors.gray1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    px: 2,
    pb: 3,
    pt: 6,
    alignItems: 'center'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    px: 2,
    gap: 2,
    width: '100%',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    gap: 3,
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    borderRadius: '12px'
  },
  button: {
    width: '100%',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    borderRadius: '12px'
  },
  thumbnail: {
    width: 'clamp(230px, 19vw, 2500px)',
    height: 'clamp(230px, 19vw, 2500px)',
    borderRadius: '12px'
  },
  linkWrapper: { display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' },
  link: {
    color: colors.secondary,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  jsonTitle: { display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' },
  jsonWrapper: {
    p: 2,
    width: {
      xs: 'clamp(280px, 75vw, 1290px)',
      sm: 'clamp(280px, 35vw, 5000px)'
    },
    height: {
      xs: '515px',
      sm: '515px',
      md: '515px',
      lg: '640px'
    }
  },
  jsonContent: {
    height: '82%',
    overflow: 'auto',
    mt: 2,
    borderRadius: '12px',
    p: 0.5,
    border: `1px solid ${colors.gray3}`
  },
  backdrop: {
    zIndex: 1030,
    background: 'rgb(0 0 0 / 37%)',
    filter: 'blur(4px)'
  }
};

export default styles;
