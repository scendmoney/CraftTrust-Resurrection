export function getAromaId(aroma: string) {
  switch (aroma) {
    case 'terpinene':
      return 1;
    case 'gas':
      return 2;
    case 'limonene':
      return 3;
    case 'nerolidol':
      return 4;
    case 'caryophyllene':
      return 5;
    case 'candy':
      return 6;
    default:
      return 0;
  }
}
