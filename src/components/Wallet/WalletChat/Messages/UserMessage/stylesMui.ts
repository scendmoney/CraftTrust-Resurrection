import { colors } from 'mui/theme/colors';

const stylesMui = {
  myMessage: {
    display: 'flex',
    justifyContent: 'flex-start',

    marginRight: '18px',
    marginLeft: '12px',
    padding: '12px 8px 12px 16px',
    gap: '8px',
    marginBottom: '12px',
    color: colors.white,
    backgroundColor: colors.black1,
    width: {
      xs: '280px',
      sm: '340px',
      md: '340px',
      lg: '360px'
    },

    borderRadius: '12px',
    alignSelf: 'flex-end'
  },

  otherMessage: {
    display: 'flex',
    justifyContent: 'flex-start',

    marginRight: '18px',
    marginLeft: '12px',
    padding: '12px 16px 12px 8px',
    gap: '8px',
    marginBottom: '12px',

    backgroundColor: colors.white,
    borderRadius: '12px',
    alignSelf: 'flex-start',
    width: {
      xs: '280px',
      sm: '340px',
      md: '340px',
      lg: '360px'
    }
  },

  message: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },
  nameLine: {
    display: 'flex',
    gap: '6px',
    alignItems: 'flex-start',

    cursor: 'default',
    letterSpacing: '-0.02em',
    marginTop: '4px',
    fontSize: '12px'
  },
  body: {
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    fontSize: '16px',
    marginTop: '4px'
  },

  image: {
    width: '100%',
    height: 'auto',

    borderRadius: '12px',
    cursor: 'pointer',
    mt: '12px',
    display: 'flex',
    objectFit: 'contain'
  }
};

export default stylesMui;
