const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    '@media only screen and (max-width: 1920px)': {
      gridTemplateColumns: '1fr 1fr 1fr 1fr'
    },
    '@media only screen and (max-width: 1250px)': {
      gridTemplateColumns: '1fr 1fr 1fr'
    },
    '@media only screen and (max-width: 1050px)': {
      gridTemplateColumns: '1fr 1fr'
    },
    '@media only screen and (max-width: 500px)': {
      gridTemplateColumns: '1fr'
    },
    gridGap: '10px'
  }
};
export default styles;
