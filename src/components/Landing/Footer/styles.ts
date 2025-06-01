import { colors } from 'mui/theme/colors';

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.black,
    mt: 10,
    pt: 10,
    pb: 6,
    mx: '20px',
    px: 'clamp(40px, 14.535vw, 250px)',
    '@media only screen and (max-width: 1050px)': {
      px: '20px',
      gridTemplateColumns: '1fr'
    },

    span: {
      color: colors.green
    }
  },
  title: {
    fontSize: 'clamp(52px, 3.721vw, 240px)',
    fontWeight: '400'
  },
  caption: {
    // maxWidth: '100%',
    fontSize: 'clamp(24px, 1.395vw, 240px)',
    '@media only screen and (max-width: 1050px)': {
      // maxWidth: '100%',
      fontSize: '20px'
    }
  },

  benefits: {
    display: 'flex',
    gap: 2,
    mt: 10,
    pt: 8,
    pb: 10,

    borderTop: `1px solid ${colors.green}`,

    '@media only screen and (max-width: 1050px)': {
      flexDirection: 'column',
      gap: '24px',
      fontSize: '20px'
    },
    fontSize: '24px',
    lineHeight: '100%',
    a: {
      lineHeight: '100%',
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },

  buttons: {
    mt: 4,
    mb: 6,
    display: 'flex',
    gap: '16px',
    fontSize: '99px',
    flexWrap: 'wrap'
  },
  button1: {
    padding: '12px 14px',
    fontSize: '24px',
    borderRadius: '12px',
    minWidth: '18vw',
    lineHeight: '120%',
    backgroundColor: colors.green,
    color: colors.black,
    borderColor: colors.green,
    fontWeight: 500,
    textTransform: 'initial',
    border: `1px solid ${colors.green}`,
    '&:hover': {
      backgroundColor: colors.black1,
      color: colors.white
    }
  },
  button2: {
    padding: '12px 14px',
    fontSize: '24px',
    borderRadius: '12px',
    minWidth: '18vw',
    lineHeight: '120%',
    backgroundColor: 'transparent',
    color: colors.gray5,
    borderColor: colors.green,
    fontWeight: 500,
    textTransform: 'initial',
    border: `1px solid ${colors.gray5}`,
    '&:hover': {
      backgroundColor: colors.black1,
      color: colors.white
    }
  },
  footerContent: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    justifyContent: 'space-between',
    gap: 4
  },
  footerTitle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxWidth: {
      xs: '100%',
      sm: '55%'
    }
  }
};

export default styles;
