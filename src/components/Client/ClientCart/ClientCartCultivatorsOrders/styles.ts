import { colors } from 'mui/theme/colors';

const styles = {
  cultivatorOrderWraper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    backgroundColor: {
      xs: colors.white,
      sm: colors.gray1
    }
  },
  orders: {
    backgroundColor: colors.white,
    padding: {
      xs: 0,
      sm: '24px 16px'
    },
    borderRadius: '12px',
    my: {
      xs: 0,
      sm: 2
    }
  },
  empoyeeWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    gap: {
      xs: '16px',
      sm: 0
    }
  },
  empoyeeTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: {
      xs: 1,
      sm: 2
    }
  },
  avatar: {
    width: '48px',
    height: '48px'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '16px'
  },
  totalPrice: {
    display: 'flex',
    alignSelf: 'flex-end',
    gap: '16px'
  },
  iconDelete: {
    '& svg': {
      width: '24px',
      height: '24px'
    }
  }
};

export default styles;
