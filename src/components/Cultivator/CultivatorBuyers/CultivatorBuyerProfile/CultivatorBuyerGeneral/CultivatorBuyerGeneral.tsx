import { FC, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Divider, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { IFacilityModel } from 'graphql/_server';
import Routes from 'routes';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

const CultivatorBuyerGeneral: FC<{ data: IFacilityModel | undefined; id?: string }> = ({
  data,
  id
}) => {
  const dataUm = useMemo(() => {
    return data?.facilityCultivatorRelations ? data?.facilityCultivatorRelations[0] : undefined;
  }, [data?.facilityCultivatorRelations]);
  const { router } = useProjectRouter();

  return (
    <>
      <Box mb={3} mt={4}>
        <Typography variant="subtitle1" fontWeight={500}>
          Contact Person
        </Typography>
      </Box>

      <Grid container spacing={2} mb={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <InputText
            startAdornment={
              <InputAdornment position="start">
                <AvatarUncontrolled
                  type={24}
                  variant="rounded"
                  src={data?.userContact?.asset?.url}
                />
              </InputAdornment>
            }
            titleText="Full Name"
            placeholder="Contact Person"
            value={data?.userContact?.fullName || ''}
            readOnly
          />
        </Grid>
        {data?.userContact?.phoneNumber && (
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <InputPhone
              titleText="Phone #"
              placeholder="-"
              value={data?.userContact?.phoneNumber}
              readOnly
            />
          </Grid>
        )}
        {data?.userContact?.email && (
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <InputText titleText="Email" value={data?.userContact?.email} readOnly />
          </Grid>
        )}
      </Grid>
      <Box mb={3}>
        <Divider light />
      </Box>
      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight={500}>
          Owner
        </Typography>
      </Box>
      <Grid container spacing={2} mb={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <InputText
            startAdornment={
              <InputAdornment position="start">
                <AvatarUncontrolled type={24} variant="rounded" src={data?.owner?.asset?.url} />
              </InputAdornment>
            }
            titleText="Full Name"
            placeholder="Owner Person"
            value={data?.owner?.fullName || ''}
            readOnly
          />
        </Grid>
        {data?.owner?.phoneNumber && (
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <InputPhone
              titleText="Phone #"
              placeholder="-"
              value={data?.owner?.phoneNumber}
              readOnly
            />
          </Grid>
        )}
        {data?.owner?.email && (
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <InputText titleText="Email" value={data?.owner?.email} readOnly />
          </Grid>
        )}
      </Grid>
      <Box>
        <Divider light />
      </Box>
      {(data?.email || data?.address?.fullAddress || data?.phoneNumber) && (
        <>
          <Box mb={4} mt={3}>
            <Typography variant="subtitle1" fontWeight={500}>
              Facility Contacts
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {data?.email && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <InputText titleText="Email" value={data?.email} readOnly />
              </Grid>
            )}
            {data?.phoneNumber && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <InputPhone
                  titleText="Phone #"
                  placeholder="-"
                  value={data?.phoneNumber}
                  readOnly
                />
              </Grid>
            )}
            {data?.address.fullAddress && (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <InputText titleText="Address" value={data?.address?.fullAddress} readOnly />
              </Grid>
            )}
          </Grid>
          <Box mt={2}>
            <Divider light />
          </Box>
        </>
      )}

      {dataUm ? (
        <>
          <Box mb={3} mt={3}>
            <Typography variant="subtitle1" fontWeight={500}>
              Financial Overview
            </Typography>
          </Box>
          <Grid container spacing={2} mb={4}>
            <Grid item lg={6} md={12} sm={6} xs={12}>
              <NumericFormat
                value={dataUm.orderTotalSpend}
                customInput={InputText}
                titleText="Total Spend"
                thousandSeparator={true}
                fixedDecimalScale={true}
                prefix="$"
                readOnly
              />
            </Grid>

            <Grid item lg={6} md={12} sm={6} xs={12}>
              <NumericFormat
                value={dataUm.dueBalance}
                customInput={InputText}
                titleText="Outstanding balance"
                thousandSeparator={true}
                fixedDecimalScale={true}
                prefix="$"
                readOnly
              />
            </Grid>

            <Grid item lg={6} md={12} sm={6} xs={12}>
              <NumericFormat
                value={dataUm.avgPurchase}
                customInput={InputText}
                titleText="Avarage Purchase"
                thousandSeparator={true}
                fixedDecimalScale={true}
                prefix="$"
                readOnly
              />
            </Grid>

            <Grid item lg={6} md={12} sm={6} xs={12}>
              <InputText
                titleText="Total Orders"
                value={dataUm.totalOrders}
                readOnly
                endAdornment={
                  id ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => router.push(`${Routes.CULTIVATOR_ORDERS}?buyerId=${id}`)}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined
                }
              />
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default CultivatorBuyerGeneral;
