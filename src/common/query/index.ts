import { Injectable } from '@nestjs/common';
import {
  In,
  Between,
  Not,
  Equal,
  ILike,
  FindOperator,
  IsNull,
  ArrayContains,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
} from 'typeorm';

import ErrorMsgEnum from '../../enums/error';
import merge from 'lodash/merge';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  SortDirectionEnum,
} from '../../enums/common';
import { FilterDTO, SortDTO } from './query.dto';

@Injectable()
export default class QueryService {
  static async list<T>(
    repository,
    {
      payload,
      relations,
    }: {
      payload: Record<string, any>;
      relations?: string[];
    },
    andWhere = {},
  ): Promise<T> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);

    const [items, total] = await repository.findAndCount({
      ...paginate,
      relations: relations || [],
      order,
      where: merge(QueryService.getFilters(filters), andWhere),
    });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    } as T;
  }

  static async item<T>(
    repository,
    {
      payload,
      relations,
    }: {
      payload: Record<string, any>;
      relations?: string[];
    },
    andWhere = {},
  ): Promise<T> {
    const filters = payload?.filters || [];

    const item = await repository.findOne({
      relations: relations || [],
      where: merge(QueryService.getFilters(filters), andWhere),
    });

    if (!item) {
      throw new Error(ErrorMsgEnum.EntityNotExist);
    }
    return item as T;
  }

  static getSorts(sorts: SortDTO[]) {
    const sort = {};
    sorts.forEach((item: SortDTO) => {
      const valueSort = item.direction.toUpperCase() || 'DESC';
      const { key, value } = QueryService.getSplitValue(
        item.columnName,
        valueSort,
      );
      sort[key] = value;
    });
    return sort;
  }

  static getSplitValue = (
    columnName: string,
    value: FindOperator<unknown> | string,
  ): { key: string; value: string | object } => {
    const columnNameList = columnName.split('.');
    const result: { key: string; value: string | object } = {
      key: columnNameList[0],
      value: null,
    };
    switch (columnNameList.length) {
      case 2:
        result.value = { [columnNameList[1]]: value };
        break;
      case 3:
        result.value = { [columnNameList[1]]: { [columnNameList[2]]: value } };
        break;
      case 4:
        result.value = {
          [columnNameList[1]]: {
            [columnNameList[2]]: { [columnNameList[3]]: value },
          },
        };
        break;
      default:
        result.value = value;
    }
    return result;
  };

  static getSplitValueRelation = (
    columnName: string,
    relations: Set<string>,
  ) => {
    const columnNameList = columnName.split('.');
    if (columnNameList.length === 1) {
      return;
    }
    columnNameList.slice(0, -1).reduce((prev, current) => {
      let result = prev;
      if (result !== '') {
        result = `${result}.`;
      }
      result = `${result}${current}`;
      relations.add(result);
      return result;
    }, '');
  };

  static getFilters(filters: FilterDTO[] = []) {
    const filter: Record<string, number | string | boolean | object> = {};
    filters.forEach((item: FilterDTO) => {
      let valueFilter = null;
      switch (item?.operation) {
        case FilterOperationEnum.containsInArray: {
          switch (item.type) {
            case FilterFieldTypeEnum.number:
            case FilterFieldTypeEnum.text: {
              valueFilter = ArrayContains([item.value[0]]);
              break;
            }
            default:
              throw new Error(ErrorMsgEnum.EntityNotExist);
          }
          break;
        }
        case FilterOperationEnum.contains: {
          switch (item.type) {
            case FilterFieldTypeEnum.text: {
              valueFilter = ILike(`%${item.value[0]}%`);
              break;
            }
            default:
              throw new Error(ErrorMsgEnum.EntityNotExist);
          }
          break;
        }

        case FilterOperationEnum.notEqual:
        case FilterOperationEnum.equal: {
          switch (item.type) {
            case FilterFieldTypeEnum.date:
            case FilterFieldTypeEnum.dateRange: {
              if (item.value.length === 2) {
                if (item.value[0] > item.value[1]) {
                  throw new Error(ErrorMsgEnum.EntityNotExist);
                }
                valueFilter =
                  item?.operation === FilterOperationEnum.equal
                    ? Between(item.value[0], item.value[1])
                    : Not(Between(item.value[0], item.value[1]));
              } else {
                valueFilter =
                  item?.operation === FilterOperationEnum.equal
                    ? In(item.value)
                    : Not(In(item.value));
              }
              break;
            }
            case FilterFieldTypeEnum.boolean: {
              valueFilter =
                item?.operation === FilterOperationEnum.equal
                  ? Equal(item.value[0] === 'true')
                  : Not(Equal(item.value[0] === 'true'));
              break;
            }
            case FilterFieldTypeEnum.number: {
              valueFilter =
                item?.operation === FilterOperationEnum.equal
                  ? In(item.value.map((value: string) => Number(value)))
                  : Not(In(item.value.map((value: string) => Number(value))));
              break;
            }
            case FilterFieldTypeEnum.NULL: {
              valueFilter =
                item?.operation === FilterOperationEnum.equal
                  ? IsNull()
                  : Not(IsNull());

              break;
            }
            case FilterFieldTypeEnum.text: {
              valueFilter =
                item?.operation === FilterOperationEnum.equal
                  ? In(item.value)
                  : Not(In(item.value));

              break;
            }

            case FilterFieldTypeEnum.numberRange: {
              const values = item.value.map((value: string) => Number(value));
              if (values[0] > values[1])
                throw new Error(ErrorMsgEnum.EntityNotExist);
              valueFilter =
                item?.operation === FilterOperationEnum.equal
                  ? Between(values[0], values[1])
                  : Not(Between(values[0], values[1]));
              break;
            }
            default:
          }

          break;
        }

        case FilterOperationEnum.moreThan: {
          switch (item.type) {
            case FilterFieldTypeEnum.date:
            case FilterFieldTypeEnum.number: {
              valueFilter = MoreThan(item.value[0]);
              break;
            }

            default:
          }
          break;
        }
        case FilterOperationEnum.moreThanOrEqual: {
          switch (item.type) {
            case FilterFieldTypeEnum.date:
            case FilterFieldTypeEnum.number: {
              valueFilter = MoreThanOrEqual(item.value[0]);
              break;
            }

            default:
          }
          break;
        }
        case FilterOperationEnum.lessThan: {
          switch (item.type) {
            case FilterFieldTypeEnum.date:
            case FilterFieldTypeEnum.number: {
              valueFilter = LessThan(item.value[0]);
              break;
            }

            default:
          }
          break;
        }
        case FilterOperationEnum.lessThanOrEqual: {
          switch (item.type) {
            case FilterFieldTypeEnum.date:
            case FilterFieldTypeEnum.number: {
              valueFilter = LessThanOrEqual(item.value[0]);
              break;
            }

            default:
          }
          break;
        }

        default:
      }

      if (item) {
        const { key, value } = QueryService.getSplitValue(
          item.columnName,
          valueFilter,
        );
        merge(filter, { [key]: value });
      }
    });

    return filter;
  }

  // Returns dependencies for successful filtering and sorting
  static getRelations(
    filters: FilterDTO[] = [],
    sorts: SortDTO[] = [],
  ): string[] {
    const relations = new Set<string>();
    filters.forEach((item: FilterDTO) => {
      QueryService.getSplitValueRelation(item.columnName, relations);
    });

    sorts.forEach((item: SortDTO) => {
      QueryService.getSplitValueRelation(item.columnName, relations);
    });

    return Array.from(relations);
  }

  static getFiltersSql(filters: FilterDTO[]): string {
    const sqlFilters = [];
    filters?.forEach((item: FilterDTO) => {
      let filter = '';
      switch (item?.operation) {
        case FilterOperationEnum.contains: {
          switch (item.type) {
            case FilterFieldTypeEnum.text: {
              filter = `${item.columnName} ILike('%${item.value[0]}%')`;
              break;
            }
            default:
              throw new Error(ErrorMsgEnum.EntityNotExist);
          }
          break;
        }

        case FilterOperationEnum.notEqual:
        case FilterOperationEnum.equal: {
          switch (item.type) {
            case FilterFieldTypeEnum.date:
            case FilterFieldTypeEnum.dateRange: {
              if (item.value.length === 2) {
                if (item.value[0] > item.value[1]) {
                  throw new Error(ErrorMsgEnum.EntityNotExist);
                }
                filter =
                  item?.operation === FilterOperationEnum.equal
                    ? `${item.columnName} Between '${item.value[0]}' AND '${item.value[1]}'`
                    : `Not(${item.columnName} Between '${item.value[0]}' AND '${item.value[1]})'`;
              } else {
                filter =
                  item?.operation === FilterOperationEnum.equal
                    ? `${item.columnName} IN ('${item.value[0]}')`
                    : `NOT(${item.columnName} IN ('${item.value[0]}'))`;
              }
              break;
            }
            case FilterFieldTypeEnum.boolean: {
              filter =
                item?.operation === FilterOperationEnum.equal
                  ? `${item.columnName} = ${item.value[0]}`
                  : `${item.columnName} != ${item.value[0]}`;
              break;
            }
            case FilterFieldTypeEnum.number: {
              filter =
                item?.operation === FilterOperationEnum.equal
                  ? `${item.columnName} IN (${item.value
                      .map((value: string) => Number(value))
                      .join(',')})`
                  : `NOT(${item.columnName} IN (${item.value
                      .map((value: string) => Number(value))
                      .join(',')}))`;

              break;
            }
            case FilterFieldTypeEnum.NULL: {
              filter =
                item?.operation === FilterOperationEnum.equal
                  ? `${item.columnName} is null`
                  : `${item.columnName} not is null`;

              break;
            }
            case FilterFieldTypeEnum.text: {
              filter =
                item?.operation === FilterOperationEnum.equal
                  ? `${item.columnName} IN ('${item.value[0]}')`
                  : `NOT(${item.columnName} IN ('${item.value[0]}'))`;

              break;
            }

            case FilterFieldTypeEnum.numberRange: {
              const values = item.value.map((value: string) => Number(value));
              if (values[0] > values[1])
                throw new Error(ErrorMsgEnum.EntityNotExist);
              filter =
                item?.operation === FilterOperationEnum.equal
                  ? `${item.columnName} Between ${item.value[0]} AND  ${item.value[1]}`
                  : `Not(${item.columnName} Between ${item.value[0]} AND  ${item.value[1]})`;
              break;
            }
            default:
          }

          break;
        }

        case FilterOperationEnum.moreThan: {
          switch (item.type) {
            case FilterFieldTypeEnum.number: {
              filter = `${item.columnName} > ${item.value[0]}`;
              break;
            }
            case FilterFieldTypeEnum.date: {
              filter = `${item.columnName} > '${item.value[0]}'`;
              break;
            }

            default:
          }
          break;
        }
        case FilterOperationEnum.moreThanOrEqual: {
          switch (item.type) {
            case FilterFieldTypeEnum.number: {
              filter = `${item.columnName} >= ${item.value[0]}`;
              break;
            }

            case FilterFieldTypeEnum.date: {
              filter = `${item.columnName} >= '${item.value[0]}'`;
              break;
            }

            default:
          }
          break;
        }
        case FilterOperationEnum.lessThan: {
          switch (item.type) {
            case FilterFieldTypeEnum.number: {
              filter = `${item.columnName} < ${item.value[0]}`;
              break;
            }

            case FilterFieldTypeEnum.date: {
              filter = `${item.columnName} < '${item.value[0]}'`;
              break;
            }

            default:
          }
          break;
        }
        case FilterOperationEnum.lessThanOrEqual: {
          switch (item.type) {
            case FilterFieldTypeEnum.number: {
              filter = `${item.columnName} <= ${item.value[0]}`;
              break;
            }

            case FilterFieldTypeEnum.date: {
              filter = `${item.columnName} <= '${item.value[0]}'`;
              break;
            }

            default:
          }
          break;
        }

        default:
      }
      sqlFilters.push(filter);
    });
    return sqlFilters.join(' and ');
  }
}
