import { colors } from 'mui/theme/colors';

const styles = {
  benefits: {
    mt: 10,
    pt: 10,
    pb: 10,

    '@media only screen and (max-width: 1050px)': {
      mx: 'clamp(20px, 6.977vw, 200px)',
      gridTemplateColumns: '1fr'
    },
    mx: 'clamp(40px, 14.535vw, 400px)',

    borderTop: `1px solid ${colors.green}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '40px'
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    pt: 14,
    '@media only screen and (max-width: 1050px)': {
      mx: 'clamp(20px, 6.977vw, 200px)',
      pt: 10,
      gap: 6
    },
    mx: 'clamp(40px, 14.535vw, 400px)',
    gap: 10
  },
  benefit: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    '@media only screen and (max-width: 1050px)': {
      gap: '16px'
    }
  },
  title: {
    fontSize: 'clamp(18px, 1.852vw, 180px)',
    fontWeight: '400',
    letterSpacing: '-0.04em',
    textTransform: 'initial',
    lineHeight: '120%',
    '@media only screen and (max-width: 1050px)': {
      fontSize: '22px'
    }
  },
  subtitle: {
    '@media only screen and (max-width: 768px)': {
      left: 'clamp(20px, 6.977vw, 200px)',
      right: 'clamp(20px, 6.977vw, 200px)'
    },
    fontSize: 'clamp(18px, 1.852vw, 180px)',
    color: colors.gray5,
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
