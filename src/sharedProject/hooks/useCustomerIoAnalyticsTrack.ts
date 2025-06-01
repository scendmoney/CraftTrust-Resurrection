import { useEffect, useRef } from 'react';

import { analytics } from 'components/CustomerIoAnalytics/CustomerIoAnalytics';

// import mixpanel from 'mixpanel-browser';
// import { analytics } from 'components/CustomerIoAnalytics/CustomerIoAnalytics';
import useMe from './useMe';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomerIoAnalyticsTrack = (
  isReady = false,
  event: string,
  properties?: Record<string, undefined | string | number | null>
) => {
  const { dataMe } = useMe();
  const initialized = useRef(false);

  useEffect(() => {
    if (dataMe?.context?.id && isReady && !initialized.current) {
      initialized.current = true;

      analytics.track({
        userId: `${dataMe?.context?.id}${
          process.env.NEXT_PUBLIC_ENV_BACKEND !== 'prod'
            ? `_${process.env.NEXT_PUBLIC_ENV_BACKEND}`
            : ''
        }`,
        type: 'track',
        event: event,
        properties: properties
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMe, isReady]);
};

export default useCustomerIoAnalyticsTrack;
