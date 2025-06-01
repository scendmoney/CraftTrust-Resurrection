/**
 * A React hook that provides the current window dimensions.
 *
 * @param {number} debounceMs The debounce time in milliseconds.
 * @returns {WindowDimensions} The current window dimensions.
 *
 * @example
 * // In your React component:
 * import React from 'react';
 * import useWindowDimensions from './useWindowDimensions';
 *
 * const MyComponent: React.FC = () => {
 *   const { width, height } = useWindowDimensions(200);
 *   return (
 *     <div>
 *       <p>Width: {width}</p>
 *       <p>Height: {height}</p>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 *
 * @author Pavel Devyatov
 */

import { useEffect, useState } from 'react';

interface WindowDimensions {
  width: number | undefined;
  height: number | undefined;
}

function useWindowDimensions(debounceMs: number): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, debounceMs);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceMs]);

  return windowDimensions;
}

export default useWindowDimensions;
