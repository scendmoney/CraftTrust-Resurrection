import { ColorEnum } from 'graphql/_server';

export function getBudColor(color: ColorEnum) {
  switch (color) {
    case ColorEnum.Green:
      return {
        title: 'Green',
        color: '#BBD286'
      };
    case ColorEnum.Yellow:
      return {
        title: 'Yellow',
        color: '#E7E07B'
      };
    case ColorEnum.Purple:
      return {
        title: 'Purple',
        color: '#C580EF'
      };
    default:
      return null;
  }
}
