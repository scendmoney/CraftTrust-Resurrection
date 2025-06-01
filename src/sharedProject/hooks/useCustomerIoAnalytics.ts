import { useEffect, useRef } from 'react';
import mixpanel from 'mixpanel-browser';

// import mixpanel from 'mixpanel-browser';
// import { analytics } from 'components/CustomerIoAnalytics/CustomerIoAnalytics';
import useMe from './useMe';

const useCustomerIoAnalytics = (
  isReady = false,
  params?: { productId?: number; facilityCultivatorId?: string; orderId?: number; cartId?: number }
) => {
  const { dataMe } = useMe();
  const initialized = useRef(false);

  useEffect(() => {
    if (dataMe?.context?.id && isReady && !initialized.current) {
      initialized.current = true;
      mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY || '', {
        debug: true,
        track_pageview: false,
        persistence: 'localStorage'
      });

      mixpanel.identify(
        `${dataMe?.context?.id}${
          process.env.NEXT_PUBLIC_ENV_BACKEND !== 'prod'
            ? `_${process.env.NEXT_PUBLIC_ENV_BACKEND}`
            : ''
        }`
      );

      mixpanel.track_pageview({
        facilityId: dataMe?.context?.id,
        productId: params?.productId,
        facilityCultivatorId: params?.facilityCultivatorId,
        orderId: params?.orderId,
        cartId: params?.cartId
      });

      // analytics.page(undefined, undefined, {
      //   userId: `${dataMe?.context?.id}${
      //     process.env.NEXT_PUBLIC_ENV_BACKEND !== 'prod'
      //       ? `_${process.env.NEXT_PUBLIC_ENV_BACKEND}`
      //       : ''
      //   }`,
      //   facilityId: dataMe?.context?.id,
      //   productId: params?.productId,
      //   facilityCultivatorId: params?.facilityCultivatorId,
      //   orderId: params?.orderId,
      //   cartId: params?.cartId
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMe, isReady]);
};

export default useCustomerIoAnalytics;
