import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryEmployeesArgs,
  IUserModel,
  IUsersModelDto
} from 'graphql/_server';
import EMPLOYEES from 'graphql/queries/employees';

import LoaderInline from 'components/LoaderInline/LoaderInline';

import ClientFacilityEmployee from './ClientFacilityEmployee/ClientFacilityEmployee';

const ClientFacilityEmployees: FC = () => {
  const [employees, setEmployees] = useState<IUserModel[]>([]);

  const { loading } = useQuery<{ employees: IUsersModelDto }, IQueryEmployeesArgs>(EMPLOYEES, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'email',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Null,
            value: ['']
          }
        ]
      }
    },
    onCompleted: (data) => {
      const items = data.employees.items || [];
      setEmployees(items);
    }
  });

  return (
    <>
      {!loading ? (
        employees.map((user) => <ClientFacilityEmployee key={user.id} user={user} />)
      ) : (
        <LoaderInline />
      )}
    </>
  );
};

export default ClientFacilityEmployees;
