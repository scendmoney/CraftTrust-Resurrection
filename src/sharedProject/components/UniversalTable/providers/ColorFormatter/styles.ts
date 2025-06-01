const styles = (color: string | undefined) => {
  return {
    experience: {
      display: 'flex',
      gap: 0.5,
      alignItems: 'center'
    },
    img: { width: '24px', height: '24px', backgroundColor: color, borderRadius: '50%' }
  };
};

export default styles;
