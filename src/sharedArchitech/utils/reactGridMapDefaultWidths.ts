import { Column, TableColumnWidthInfo } from '@devexpress/dx-react-grid';

const reactGridMapDefaultWidths = (columns: Column[]): TableColumnWidthInfo[] => {
  return columns.map((item) => {
    return {
      columnName: item.name,
      width: resolveWidthByColumnName(item.name)
    };
  });
};

const resolveWidthByColumnName = (columnName: string): number => {
  // let multiply = 1;
  // if (typeof window !== 'undefined') {
  //   const widthScale = window?.innerWidth / 1500;
  //   if (widthScale > 1) {
  //     multiply = widthScale;
  //   }
  // }

  switch (columnName) {
    case 'item.name':
    case 'fullName':
    case 'displayName':
    case 'name':
    case 'email':
    case 'facility.displayName':
    case 'productSurvey.item.name':
    case 'company.productSurvey.item.name':
    case 'product.item.name':
    case 'companyName':
      // return 350 * multiply;
      return 300;
    case 'phone':
    case 'company.facilityCultivator.displayName':
    case 'company.products':
    case 'products':
    case 'product':
    case 'facilityCultivator.displayName':
      // return 200 * multiply;
      return 200;
    case 'createdDate':
    case 'updatedDate':
    case 'dates.createdDate':
    case 'dates.updatedDate':
      // return 175 * multiply;
      return 175;
    case 'menu':
    case 'options':
    case 'surveys':
      // return 75 * multiply;
      return 75;
    default:
      // return 160 * multiply;
      return 160;
  }
};

export default reactGridMapDefaultWidths;
