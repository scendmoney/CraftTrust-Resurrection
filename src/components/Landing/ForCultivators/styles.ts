import { colors } from 'mui/theme/colors';

const styles = {
  web3: {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: colors.gray1,
    overflow: 'hidden',
    mt: 10,
    pt: 10,
    pb: 10,

    mx: '20px',
    px: 'clamp(40px, 14.535vw, 250px)',

    borderRadius: '64px',
    '@media only screen and (max-width: 1050px)': {
      px: 'clamp(20px, 6.977vw, 200px)',
      gridTemplateColumns: '1fr',
      mx: 0,
      borderRadius: '32px'
    },

    span: {
      color: colors.red
    }
  },
  imgLogo: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    mb: 5
  },
  threeJs: {
    div: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  description: {
    fontSize: 'clamp(32px, 3.721vw, 320px);',
    lineHeight: '100%'
  },
  benefits: {
    mt: 10,
    pt: 10,
    pb: 10,
    borderTop: `1px solid ${colors.red}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr'
    },
    gap: '40px'
  },
  benefit: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    '@media only screen and (max-width: 1050px)': {
      gap: '16px',
      fontSize: '20px'
    }
  },
  title: {
    fontSize: 'clamp(18px, 1.852vw, 180px)',
    letterSpacing: '-0.04em',
    fontWeight: '400',
    textTransform: 'initial',
    lineHeight: '120%',
    '@media only screen and (max-width: 1050px)': {
      fontSize: '22px'
    }
  },
  subtitle: {
    fontSize: 'clamp(18px, 1.852vw, 180px)',
    color: colors.gray2,
    opacity: 0.45,
    letterSpacing: '-0.04em',
    textTransform: 'initial',
    lineHeight: '120%',
    '@media only screen and (max-width: 1050px)': {
      fontSize: '22px'
    }
  },
  caption: {
    fontSize: 'clamp(16px, 0.93vw, 180px);',
    lineHeight: '120%',
    '@media only screen and (max-width: 1050px)': {
      fontSize: '20px'
    }
  }
};

export default styles;
