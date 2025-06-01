import { FC } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import { IFacilityModel } from 'graphql/_server';
import FACILITY_BY_ID from 'graphql/queries/facilityById';
import FacilityHeaderInfo from 'sharedProject/components/FacilityHeaderInfo/FacilityHeaderInfo';

import ClientProducts from '../ClientProducts/ClientProducts';

import styles from './styles';

const ClientCultivatorById: FC<{ cultivatorId: string }> = ({ cultivatorId }) => {
  const { data: facilityByIdData } = useQuery<{ facilityById: IFacilityModel }>(FACILITY_BY_ID, {
    variables: {
      payload: {
        id: cultivatorId
      }
    },
    skip: Boolean(!cultivatorId)
  });

  return (
    <Box sx={styles.container}>
      {facilityByIdData && <FacilityHeaderInfo facilityById={facilityByIdData?.facilityById} />}

      <ClientProducts facilityId={cultivatorId} />
    </Box>
  );
};

export default ClientCultivatorById;
