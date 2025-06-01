export function getBudColor(color: string) {
  switch (color) {
    case '#BBD286':
      return 1;
    case '#D0CB7F':
      return 2;
    case '#ECC276':
      return 3;
    case '#FFBB6D':
      return 4;
    case '#FF969E':
      return 5;
    case '#C368B5':
      return 6;
    default:
      return 0;
  }
}
