import { Sorting } from '@devexpress/dx-react-grid';
import { ISortDto, SortDirectionEnum } from 'graphql/_server';

const reactGridMapSortings = (sorting: Sorting[]): ISortDto[] => {
  return sorting.map((item) => {
    return {
      columnName: resolveColumnName(item.columnName),
      direction: item.direction as SortDirectionEnum
    };
  });
};

const resolveColumnName = (columnName: string) => {
  switch (columnName) {
    case 'statusSurvey':
      return 'status';
    default:
      return columnName;
  }
};

export default reactGridMapSortings;
