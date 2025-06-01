import { colors } from 'mui/theme/colors';

const styles = {
  wrapper: {
    px: 'clamp(24px, 2.68vw, 240px)',
    py: 'clamp(24px, 2.68vw, 240px)',
    display: 'flex',
    flexDirection: 'column'
  },
  blockWrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    gap: {
      xs: 5,
      sm: 5,
      md: 10
    },
    pt: 'clamp(24px, 2.68vw, 48px)',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '24px'
  },
  facilityInfoWraper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.10)',
    padding: '24px',
    width: '100%'
  },
  facilityContent: {
    display: 'flex',
    flexDirection: {
      xs: 'column-reverse',
      sm: 'column-reverse',
      md: 'column-reverse',
      lg: 'row',
      xl: 'row'
    },
    justifyContent: 'space-between',
    gap: '24px',
    alignItems: 'flex-start'
  },
  faqWrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: '1px solid (0, 0, 0, 0.10)',
    padding: '24px',
    gap: '24px'
  },
  buttonAdd: {
    display: 'flex',
    mt: '8px',
    gap: '12px',
    alignItems: 'center',
    padding: '12px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    ':hover': {
      borderRadius: '12px',
      backgroundColor: 'rgba(0, 0, 0, 0.10)'
    }
  },
  licenseWrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: `1px solid ${colors.gray1}`
    },
    width: '100%',
    pr: '24px'
  },
  license: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
    '& svg': {
      width: 'clamp(24px, 3.5vw, 48px)',
      height: 'clamp(24px, 3.5vw, 48px)'
    }
  },
  licenseIcon: {
    display: 'inline-block',
    verticalAlign: {
      xs: 'middle',
      sm: 'text-top'
    }
  }
};

export default styles;
