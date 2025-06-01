import { colors } from 'mui/theme/colors';

const styles = {
  metrcWrapper: {
    display: 'flex',
    flexDirection: 'column',
    ml: 12,
    position: 'relative'
  },
  line: {
    position: 'absolute',
    left: '-20px',
    top: '-20px',
    borderLeft: '1px solid #ddd',
    height: 'clamp(40px, 2.75vw, 200px)',
    width: '50px',
    borderBottom: '1px solid #ddd'
  },
  packages: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1
  },
  package: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 1
  },
  cardActionWrapper: {
    maxWidth: 'clamp(240px, 15vw, 2000px)',
    backgroundColor: colors.gray1,
    borderRadius: '12px',
    p: 1
  }
};

export default styles;
