const styles = (animationDelay: number, color: string) => {
  return {
    animation: 'fadeIn 0.3s linear forwards',
    animationDelay: `${animationDelay}s`,
    opacity: 0,
    color: color,
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    }
  };
};
export default styles;
