export function getAromaImg(numberImg: number) {
  switch (numberImg) {
    case 1:
      return {
        title: 'Pine',
        src: '/resources/img/terpenes/terpinene.png'
      };
    case 2:
      return {
        title: 'Gas',
        src: '/resources/img/survey/gas.png'
      };
    case 3:
      return {
        title: 'Lemon/Orange',
        src: '/resources/img/terpenes/limonene.png'
      };
    case 4:
      return {
        title: 'Earth/Wood',
        src: '/resources/img/terpenes/nerolidol.png'
      };
    case 5:
      return {
        title: 'Spicy',
        src: '/resources/img/terpenes/caryophyllene.png'
      };
    case 6:
      return {
        title: 'Candy',
        src: '/resources/img/survey/candy.png'
      };
    case 7:
      return {
        title: 'Burger',
        src: '/resources/img/surveyNew/burger.png'
      };
    case 8:
      return {
        title: 'Fruity',
        src: '/resources/img/surveyNew/fruity.png'
      };
    default:
      return null;
  }
}
