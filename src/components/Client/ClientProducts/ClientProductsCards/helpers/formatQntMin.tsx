export const formatQntMin = (quantity: number) => {
  switch (quantity) {
    case 0:
      return '0';
    case 0.5:
      return '1/2';
    case 0.25:
      return '1/4';
    case 1:
      return '1';
    default:
      return;
  }
};
