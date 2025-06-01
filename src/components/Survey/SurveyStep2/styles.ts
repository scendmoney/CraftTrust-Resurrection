import { colors } from 'mui/theme/colors';

const styles = {
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',

    overflow: 'hidden',
    flexGrow: 1
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
    margin: '0 auto',
    overflow: 'hidden',
    flexGrow: 1
  },

  headBlock: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    borderRadius: '12px',
    alignItems: 'center',
    color: colors.white,
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px'
  },

  surveyStack: {
    position: 'absolute',
    overflowX: 'hidden',
    top: '140px',
    left: 0,
    right: 0,
    bottom: '88px',
    zIndex: 1000
  },

  avatarProduct: {
    width: '100px',
    height: '100px',
    backgroundColor: 'transparent'
  },

  questionTitle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },

  name: {
    fontSize: '32px',
    minHeight: '100px'
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    backgroundColor: colors.white,
    borderRadius: '12px',
    px: 'clamp(16px, 1.34vw, 24px)',
    py: 'clamp(16px, 1.768vw, 320px)',
    height: '60vh'
  },

  stackButtonWrapper: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    gap: '8px'
  },

  stackBackButton: {
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: 500,
    maxWidth: '100%',
    letterSpacing: '-0.96px',
    textTransform: 'initial',
    color: colors.white,
    backgroundColor: colors.black1,
    '&:hover': {
      backgroundColor: colors.secondary
    }
  },

  stackNextButton: {
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: 500,
    maxWidth: '100%',
    letterSpacing: '-0.96px',
    textTransform: 'initial',
    color: colors.white,
    backgroundColor: colors.secondary,
    '&:hover': {
      backgroundColor: colors.secondary
    }
  },

  question: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    backgroundColor: colors.white,
    borderRadius: '12px',
    px: 'clamp(16px, 1.34vw, 24px)',
    py: 'clamp(16px, 1.768vw, 320px)'
  },

  imgGrid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(80px, 180px))',
    gridGap: '8px',
    justifyContent: 'center'
  },

  imgWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    img: {
      objectFit: 'contain'
    }
  },

  colorsWrapper: {
    display: 'flex',

    justifyContent: 'center',
    gap: 0.5,
    img: {
      objectFit: 'contain'
    },
    '@media only screen and (min-width: 500px)': {
      justifyContent: 'flex-start',
      ml: 4
    }
  },
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: 'transparent'
  },

  switchWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(120px, 220px))',

    gridGap: '8px',
    justifyContent: 'center'
  },
  nose: {
    '&.MuiSlider-markLabel': {
      transform: 'none'
    }
  }
};

export default styles;
