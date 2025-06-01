import { FC } from 'react';
import { Grid, InputAdornment, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrderModel, ShippingTypeEnum } from 'graphql/_server';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';

import styles from './styles';

const OrderPickBy: FC<{ order: IOrderModel }> = ({ order }) => {
  if (order.shippingType === ShippingTypeEnum.PickUp) {
    return (
      <Box sx={styles.facilityContent}>
        <Box sx={styles.facilityInfoWrapper}>
          <Typography variant="subtitle1" fontWeight={500} mb={3}>
            Pick Up Information
          </Typography>

          <Grid container spacing={2} mb={2}>
            <Grid item lg={6} xs={12}>
              <InputText
                startAdornment={
                  <InputAdornment position="start">
                    <AvatarUncontrolled
                      type={24}
                      variant="rounded"
                      src={order?.contactPerson?.asset?.url}
                    />
                  </InputAdornment>
                }
                titleText="Will be picked up by"
                placeholder="Will be picked up by"
                value={order?.contactPerson?.fullName || ''}
                readOnly
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <InputText
                titleText="License #"
                placeholder="License #"
                value={order?.contactPerson?.license?.licenseNumber || ''}
                readOnly
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <InputPhone
                titleText="Phone #"
                placeholder="US Phone Number"
                value={order?.contactPerson?.phoneNumber || ''}
                readOnly
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <InputText
                titleText="Email"
                placeholder="Email"
                value={order?.contactPerson?.email || ''}
                readOnly
              />
            </Grid>

            {order.comments ? (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <InputText
                  titleText="Comments"
                  value={order.comments}
                  placeholder="Comments"
                  readOnly
                />
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </Box>
    );
  }

  if (order.shippingType === ShippingTypeEnum.Delivery) {
    return (
      <Box sx={styles.facilityContent}>
        <Box sx={styles.facilityInfoWrapper}>
          <Typography variant="subtitle1" fontWeight={500} mb={3}>
            Delivery Information
          </Typography>

          <Grid container spacing={2} mb={2}>
            <Grid item lg={6} xs={12}>
              <InputText
                startAdornment={
                  <InputAdornment position="start">
                    <AvatarUncontrolled
                      type={24}
                      variant="rounded"
                      src={order?.contactPerson?.asset?.url}
                    />
                  </InputAdornment>
                }
                titleText="Contact Person"
                placeholder="Contact Person"
                value={order?.contactPerson?.fullName || ''}
                readOnly
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <InputText
                titleText="License Number"
                placeholder="License Number"
                value={order?.contactPerson?.license?.licenseNumber || ''}
                readOnly
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <InputPhone
                titleText="Phone #"
                placeholder="US Phone Number"
                value={order?.contactPerson?.phoneNumber || ''}
                readOnly
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <InputText
                titleText="Email"
                placeholder="Email"
                value={order?.contactPerson?.email || ''}
                readOnly
              />
            </Grid>

            <Grid item lg={6} md={12} sm={12} xs={12}>
              <InputText titleText="ZIP" value={order.zip} placeholder="ZIP" readOnly />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <InputText titleText="City" value={order.city} placeholder="City" readOnly />
            </Grid>
            <Grid item lg={12} xs={12}>
              <InputText titleText="Address" value={order.address} placeholder="Address" readOnly />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
  return null;
};

export default OrderPickBy;
