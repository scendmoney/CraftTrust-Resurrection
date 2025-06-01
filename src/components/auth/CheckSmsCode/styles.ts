import { flatten } from 'lodash';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh',
    minHeight: '200px',
    gap: 4
  },
  sendAgain: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 1,
    '@media only screen and (max-width: 768px)': {
      flexDirection: 'column',
      '> *': {
        width: '100%'
      }
    }
  }
};

export default styles;
