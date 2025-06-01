import { colors } from 'mui/theme/colors';

const styles = {
  product: {
    backgroundColor: colors.gray1
  },
  productWrapper: {
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
    justifyContent: 'space-between',
    px: 'clamp(24px, 2.68vw, 48px)',
    py: 'clamp(40px,  2.232vw, 400px)',
    gap: '24px'
  },
  facilityContentWrapper: {
    px: 'clamp(32px, 1.786vw, 320px)',
    pb: {
      xs: 10,
      sm: 2
    }
  },
  facilityName: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row'
    },
    gap: '24px'
  },
  avatar: {
    width: 'clamp(214px, 12vw, 2140px)',
    height: 'clamp(214px, 12vw, 2140px)'
  },
  descriptionWrapper: {
    width: '100%'
  },
  productContent: {
    width: {
      xs: '100%',
      sm: '100%',
      md: 'clamp(780px, 42.411vw, 5000px)'
    }
  },
  line: {
    display: 'flex',
    alignItems: 'center',
    mt: 'clamp(16px, 1.4vw, 160px)',
    gap: 'clamp(16px, 2vw, 32px)',
    flexWrap: 'wrap'
  },
  metrcBadge: {
    width: '117px',
    height: '50px'
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: {
      xs: 'flex-start',
      sm: 'flex-start',
      md: 'flex-start'
    },
    alignSelf: 'flex-start'
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    maxHeight: '600px',
    objectFit: 'cover',
    objectPosition: 'center center',
    borderRadius: '12px'
  }
};

export default styles;
