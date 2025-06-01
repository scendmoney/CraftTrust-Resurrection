import { useEffect, useRef } from 'react';

const useEffectOnlyOnce = (action: () => void, isReady = true) => {
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (isReady && !hasRunOnce.current) {
      action();
      hasRunOnce.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);
};

export default useEffectOnlyOnce;
