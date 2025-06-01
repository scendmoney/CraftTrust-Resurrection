import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

export default function useWindowSizeDebounced() {
  const [windowSize, setWindowSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    setWindowSize({
      w: window.innerWidth,
      h: window.innerHeight
    });
  }, []);

  useEffect(() => {
    const handleResizeDebounced = debounce(function handleResize() {
      setWindowSize({
        w: window.innerWidth,
        h: window.innerHeight
      });
    }, 100);

    window.addEventListener('resize', handleResizeDebounced);
    return () => window.removeEventListener('resize', handleResizeDebounced);
  }, []);

  return windowSize;
}
