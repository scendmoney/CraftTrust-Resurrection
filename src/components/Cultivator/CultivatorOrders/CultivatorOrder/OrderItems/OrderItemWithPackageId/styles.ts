import { colors } from 'mui/theme/colors';

const styles = {
  selectedContainer: {
    border: `1px solid ${colors.gray1}`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    p: '20px',
    gap: 1
  },

  containerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    p: '20px',
    borderRadius: '12px',
    border: `1px solid ${colors.white}`,
    backgroundColor: colors.white,
    boxShadow:
      '0px 6px 13px 0px rgba(0, 0, 0, 0.05), 0px 23px 23px 0px rgba(0, 0, 0, 0.04), 0px 53px 32px 0px rgba(0, 0, 0, 0.03), 0px 94px 37px 0px rgba(0, 0, 0, 0.01), 0px 146px 41px 0px rgba(0, 0, 0, 0.00)'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  }
};

export default styles;
