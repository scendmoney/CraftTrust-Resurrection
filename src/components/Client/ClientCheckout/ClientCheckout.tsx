import { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  ICartModel,
  IMutationCreateOrderArgs,
  IOrderModel,
  IQueryCartByIdArgs,
  PaymentTypeEnum,
  ShippingTypeEnum
} from 'graphql/_server';
import CREATE_ORDER from 'graphql/mutations/createOrder';
import CART_BY_ID from 'graphql/queries/cartById';
import { colors } from 'mui/theme/colors';
import router from 'next/router';
import DeliveryIcon from 'resources/iconsMui/DeliveryIcon';
import NetIcon from 'resources/iconsMui/NetIcon';
import PaymentIcon from 'resources/iconsMui/PaymentIcon';
import PickUpIcon from 'resources/iconsMui/PickUpIcon';
import WalletIcon from 'resources/iconsMui/WalletIcon';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputSelect from 'sharedProject/components/inputs/InputSelect/InputSelect';
import { TSelectOptions } from 'sharedProject/components/inputs/InputSelect/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';

import Loader from 'components/Loader/Loader';

import ClientCheckoutOrder from './ClienCheckoutOrder/ClientCheckoutOrder';
import ClientCheckoutSwitchingBlock from './ClientCheckoutSwitchingBlock/ClientCheckoutSwitchingBlock';
import styles from './styles';
import { TInputs } from './types';

const ClientCheckout: FC<{ cart: ICartModel }> = ({ cart }) => {
  const client = useApolloClient();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [phone, setPhone] = useState<string | undefined>('');

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      userContactId: 'undefined',
      zip: null,
      city: '',
      address: '',
      comments: ''
    }
  });

  const userContactId = watch('userContactId');

  useEffect(() => {
    if (cart?.facilityBuyer?.userContact?.id) {
      setValue('userContactId', cart?.facilityBuyer?.userContact?.id);
    }
  }, [cart?.facilityBuyer?.userContact?.id, setValue]);

  const facilityUsersUm: TSelectOptions[] = useMemo(() => {
    if (cart?.facilityBuyer?.users) {
      return cart.facilityBuyer.users
        .filter((item) => Boolean(item?.email))
        .map((item) => {
          return {
            value: item.id,
            label: item.fullName || item.email || 'Unnamed User',
            logo: item.asset?.url || ' '
          };
        });
    }
    return [];
  }, [cart.facilityBuyer.users]);

  const currentfacilityUserInfoUm = useMemo(() => {
    if (cart?.facilityBuyer?.users) {
      return cart?.facilityBuyer?.users.find((item) => item.id === userContactId);
    }
  }, [cart?.facilityBuyer?.users, userContactId]);

  useMemo(() => {
    setPhone(currentfacilityUserInfoUm?.phoneNumber || undefined);
  }, [currentfacilityUserInfoUm?.phoneNumber, setPhone]);

  const [checkCartAvailability] = useLazyQuery<{ cartById: ICartModel }, IQueryCartByIdArgs>(
    CART_BY_ID
  );

  const [selectedBlockDelivery, setSelectedBlockDelivery] = useState<ShippingTypeEnum>(
    ShippingTypeEnum.Delivery
  );
  const [selectedBlockPayment, setSelectedBlockPayment] = useState<PaymentTypeEnum>(
    PaymentTypeEnum.PayNow
  );

  const availableBalanceUm = useMemo(() => {
    if (cart.netInfo?.isNetActivated) {
      const balance = Number(cart?.netInfo?.netBalance) - Number(cart?.netInfo?.dueBalance);
      return balance < 0 ? 0 : balance;
    }
    return null;
  }, [cart.netInfo]);

  const isNetActiveUm = useMemo(() => {
    return availableBalanceUm && availableBalanceUm >= cart.total;
  }, [availableBalanceUm, cart.total]);

  const handleBlockClickDelivery = (blockId: ShippingTypeEnum) => {
    setSelectedBlockDelivery(blockId);
  };

  const handleBlockClickPayment = (blockId: PaymentTypeEnum) => {
    if (blockId === PaymentTypeEnum.Net && !isNetActiveUm) {
      return;
    }
    setSelectedBlockPayment(blockId);
  };

  const [createOrder] = useMutation<{ createOrder: IOrderModel }, IMutationCreateOrderArgs>(
    CREATE_ORDER
  );

  const shippingTypeUm = useMemo(() => {
    if (selectedBlockDelivery === ShippingTypeEnum.Delivery) {
      return (
        <Box sx={styles.facilityContent} key={ShippingTypeEnum.Delivery}>
          <Box sx={styles.facilityInfoWrapper}>
            <Typography variant="subtitle1" fontWeight={500} mb={3}>
              Facility
            </Typography>

            <Grid container spacing={2} mb={2}>
              <Grid item lg={12} xs={12}>
                <InputText value={cart.facilityBuyer.displayName} readOnly />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Controller
                  control={control}
                  name="zip"
                  rules={{
                    required: 'Required',
                    validate: {
                      maxLength: (value) => {
                        const parsedValue = parseInt(value ?? '', 10);
                        if (isNaN(parsedValue) || parsedValue >= 2147483647 || parsedValue < 0) {
                          return 'Invalid index value';
                        }
                        return true;
                      }
                    }
                  }}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <NumericFormat
                        value={value}
                        onBlur={onBlur}
                        error={Boolean(errors?.zip)}
                        customInput={InputText}
                        onChange={onChange}
                        titleText="ZIP"
                        placeholder="Enter ZIP"
                        helperText={errors?.zip?.message || ' '}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Controller
                  control={control}
                  rules={validations.requiredText}
                  name="city"
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <InputText
                        titleText="City"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter City"
                        helperText={errors?.city?.message || ' '}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={4}>
              <Grid item lg={12} xs={12}>
                <Controller
                  control={control}
                  name="address"
                  rules={validations.requiredText}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <InputText
                        titleText="Address"
                        placeholder="Enter Address"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        helperText={errors?.address?.message || ' '}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={styles.facilityContactPersonWrapper}>
            <Typography variant="subtitle1" fontWeight={500}>
              Contact Person
            </Typography>
            <Controller
              control={control}
              name="userContactId"
              rules={validations.required}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <InputSelect
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={facilityUsersUm}
                    helperText={errors?.userContactId?.message || ' '}
                  />
                );
              }}
            />
            <Grid container spacing={2} mb={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <InputPhone
                  titleText="Phone #"
                  placeholder="US Phone Number"
                  value={currentfacilityUserInfoUm?.phoneNumber || ''}
                  readOnly
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box sx={styles.facilityContent} key={ShippingTypeEnum.PickUp}>
          <Box sx={styles.facilityInfoWrapperPickup}>
            <Typography variant="subtitle1" fontWeight={500} mb={3}>
              Pickup Information
            </Typography>

            <Grid container spacing={2} mb={2}>
              <Grid item lg={6} xs={12}>
                <Controller
                  control={control}
                  name="userContactId"
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <InputSelect
                        titleText="Pickup Person"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        options={facilityUsersUm}
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <InputPhone
                  titleText="Phone #"
                  placeholder="US Phone Number"
                  value={currentfacilityUserInfoUm?.phoneNumber || ''}
                  readOnly
                />
              </Grid>

              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Controller
                  control={control}
                  name="comments"
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <InputText
                        titleText="Comments"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter comments"
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cart,
    control,
    currentfacilityUserInfoUm?.phoneNumber,
    errors?.address?.message,
    errors?.city?.message,
    errors?.zip,
    facilityUsersUm,
    selectedBlockDelivery
  ]);

  return (
    <Box sx={styles.wrapper}>
      {isLoading && <Loader animationDelay={0} />}
      <form onSubmit={handleSubmit(handleCreateOrder)}>
        <>
          <Typography variant="h1">Checkout</Typography>

          <Box sx={styles.blockWrapper}>
            <Box sx={styles.contentWrapper}>
              <Box sx={styles.borderWraper}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={6}
                    xs={12}
                    onClick={() => handleBlockClickDelivery(ShippingTypeEnum.Delivery)}
                  >
                    <ClientCheckoutSwitchingBlock
                      isSelected={selectedBlockDelivery === ShippingTypeEnum.Delivery}
                      title={'Delivery'}
                      freeLabel
                      icon={<DeliveryIcon fill={colors.secondary} />}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={12}
                    onClick={() => handleBlockClickDelivery(ShippingTypeEnum.PickUp)}
                  >
                    <ClientCheckoutSwitchingBlock
                      isSelected={selectedBlockDelivery === ShippingTypeEnum.PickUp}
                      title={'Pick-Up'}
                      freeLabel
                      icon={<PickUpIcon fill={colors.secondary} />}
                    />
                  </Grid>
                </Grid>
                {shippingTypeUm}
              </Box>
              <Box sx={styles.borderWraper}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    onClick={() => handleBlockClickPayment(PaymentTypeEnum.PayNow)}
                  >
                    <ClientCheckoutSwitchingBlock
                      isSelected={selectedBlockPayment === PaymentTypeEnum.PayNow}
                      title={'Pay Now'}
                      subtitle={'You pay with Credit Card'}
                      icon={<PaymentIcon stroke={colors.secondary} />}
                    />
                  </Grid>
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    onClick={() => handleBlockClickPayment(PaymentTypeEnum.PayOnDelivery)}
                  >
                    <ClientCheckoutSwitchingBlock
                      isSelected={selectedBlockPayment === PaymentTypeEnum.PayOnDelivery}
                      title={
                        selectedBlockDelivery === ShippingTypeEnum.PickUp
                          ? 'Pay on Pick-Up'
                          : 'Pay on Delivery'
                      }
                      subtitle={'You pay with Credit Card'}
                      icon={<WalletIcon stroke={colors.secondary} />}
                    />
                  </Grid>
                  {cart.netInfo?.isNetActivated && (
                    <Grid
                      item
                      sm={4}
                      xs={12}
                      onClick={() => handleBlockClickPayment(PaymentTypeEnum.Net)}
                    >
                      <ClientCheckoutSwitchingBlock
                        isSelected={selectedBlockPayment === PaymentTypeEnum.Net}
                        title={`Net ${cart.netInfo?.netDays}`}
                        subtitle={`Available Balance: $${availableBalanceUm}`}
                        icon={<NetIcon fill={isNetActiveUm ? colors.secondary : '#979797'} />}
                        disabled={!isNetActiveUm}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
            <ClientCheckoutOrder cart={cart} isLoading={isLoading} />
          </Box>
        </>
      </form>
    </Box>
  );

  async function handleCreateOrder(data: TInputs) {
    try {
      startLoading();
      const delivery = selectedBlockDelivery === ShippingTypeEnum.Delivery;
      const dataCheckCart = await checkCartAvailability({
        variables: {
          payload: {
            id: cart.id
          }
        },
        fetchPolicy: 'network-only'
      });

      const dataCheckCartError = dataCheckCart.error;

      if (dataCheckCartError) {
        toast.error(getErrorMessage(dataCheckCartError), {});
        return;
      }

      const response = await createOrder({
        variables: {
          payload: {
            cartId: cart.id,
            paymentType: selectedBlockPayment,
            shippingType: selectedBlockDelivery,
            contactPersonId: userContactId,
            address: delivery ? data.address : undefined,
            city: delivery ? data.city : undefined,
            comments: !delivery ? (dirtyFields.comments ? data.comments : undefined) : undefined,
            phone: phone,
            zip: delivery ? Number(data.zip) : undefined
          }
        }
      });

      await client.refetchQueries({
        include: ['carts']
      });
      await router.push({
        pathname: `/client/order/${response.data?.createOrder.id}`,
        query: { status: 'just-ordered' }
      });
      toast('Order created');
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      stopLoading();
    }
  }
};

export default ClientCheckout;
