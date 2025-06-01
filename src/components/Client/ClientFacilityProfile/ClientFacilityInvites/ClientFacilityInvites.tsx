import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IFacilityModel,
  IInvitationsDto,
  IInviteModel,
  IQueryInvitationsArgs
} from 'graphql/_server';
import INVITATIONS from 'graphql/queries/invitations';

import Loader from 'components/Loader/Loader';

import ClientFacilityInvite from './ClientFacilityInvite/ClientFacilityInvite';

const ClientFacilityInvites: FC<{ facility: IFacilityModel }> = ({ facility }) => {
  const [invitations, setInvitations] = useState<IInviteModel[] | undefined>(undefined);
  const { loading: loadingData } = useQuery<
    { invitations: IInvitationsDto },
    IQueryInvitationsArgs
  >(INVITATIONS, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'facility.id',
            type: FilterFieldTypeEnum.Text,
            operation: FilterOperationEnum.Equal,
            value: [String(facility.id)]
          }
        ]
      }
    },
    onCompleted: (data) => {
      const items = data.invitations.items || [];
      setInvitations(items);
    },
    fetchPolicy: 'no-cache'
  });

  if (!invitations) {
    return null;
  }

  if (loadingData) {
    return <Loader />;
  }

  return (
    <>
      {invitations.map((user) => (
        <ClientFacilityInvite user={user} key={user.id} />
      ))}
    </>
  );
};

export default ClientFacilityInvites;
