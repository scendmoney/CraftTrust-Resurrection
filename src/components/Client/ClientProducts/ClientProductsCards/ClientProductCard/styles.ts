import { colors } from 'mui/theme/colors';

const styles = {
  imgWrapper: {
    position: 'relative'
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexGrow: 1,
    boxShadow: 'none',
    justifyContent: 'space-between'
  },
  avatar: {
    position: 'absolute',
    top: 'clamp(10px, 0.558vw, 100px)',
    right: 'clamp(10px, 0.558vw, 100px)',
    width: 'clamp(32px, 1.786vw, 320px)',
    height: 'clamp(32px, 1.786vw, 320px)'
  },
  substanceWrapper: {
    borderRadius: 'clamp(40px,  2.232vw, 400px)',
    border: `1.5px solid ${colors.black1}`,
    backgroundColor: colors.gray1,
    px: '16px',
    py: '8px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 'clamp(10px, 0.558vw, 100px)',
    right: 'clamp(10px, 0.558vw, 100px)'
  },
  priceWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    mt: 'auto'
  },

  cardAction: {
    display: 'flex',
    alignItems: 'normal',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    a: {
      textDecoration: 'none'
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    flex: 1
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    maxHeight: 'clamp(420px, 23.4vw, 4200px)',
    objectFit: 'cover',
    objectPosition: 'center center',
    borderRadius: '12px',
    backgroundColor: colors.gray1,
    border: `1px solid ${colors.gray1}`,
    aspectRatio: '1 / 1'
  }
};

export default styles;
