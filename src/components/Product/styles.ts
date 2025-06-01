const styles = {
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
    px: {
      xs: '24px',
      sm: '48px',
      md: 'clamp(96px, 5.357vw, 960px)'
    },
    pb: 'clamp(64px, 3.571vw, 640px)',
    pt: {
      xs: 2,
      sm: 'clamp(64px, 3.571vw, 640px)'
    },
    gap: '24px'
  },
  facilityWrapper: {
    backgroundColor: 'white',
    width: '100%'
  },
  facilityContentWrapper: {
    px: {
      xs: 3,
      sm: 6,
      md: 'clamp(96px, 5.357vw, 960px)'
    },
    pt: 4
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
  moreCardTitle: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    justifyContent: 'space-between',
    width: '100%'
  },
  divider: {
    mt: {
      xs: 5,
      sm: 7,
      md: 12
    },
    mb: 'clamp(56px,  3.125vw, 560px)',
    mx: 'clamp(48px,  2.679vw, 480px)'
  },
  facilityCardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    mx: 'clamp(24px,  4.464vw, 800px)',
    pb: '8px',
    alignItems: {
      xs: 'normal',
      sm: 'unset'
    }
  },
  productContent: {
    width: {
      xs: '100%',
      sm: '100%',
      md: 'clamp(780px, 42.411vw, 5000px)'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: 3
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
