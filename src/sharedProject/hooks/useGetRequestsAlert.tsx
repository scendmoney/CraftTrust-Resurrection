import { useLazyQuery } from '@apollo/client';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryRequestsArgs,
  IRequestsDto,
  RequestTypeEnum,
  SortDirectionEnum
} from 'graphql/_server';
import { NEW_REQUESTS } from 'graphql/queries/requests';

const useGetRequestsAlert = (type: RequestTypeEnum[]) => {
  const [getRequestsAlert, { loading }] = useLazyQuery<
    { requests: IRequestsDto },
    IQueryRequestsArgs
  >(NEW_REQUESTS, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'status',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: ['new']
          },
          {
            columnName: 'type',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: type
          }
        ],
        sorts: [
          {
            columnName: 'id',
            direction: SortDirectionEnum.Desc
          }
        ],
        paginate: {
          skip: 0,
          take: 1
        }
      }
    },
    fetchPolicy: 'network-only'
  });

  return {
    getRequestsAlert: getRequestsAlert,
    loading: loading
  };
};

export default useGetRequestsAlert;
