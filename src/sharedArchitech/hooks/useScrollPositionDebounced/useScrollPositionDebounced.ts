import { useEffect, useRef, useState } from 'react';

const useScrollPositionDebounced = (debounceTime: number): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        setScrollPosition(window.scrollY);
      }, debounceTime);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [debounceTime]);

  return scrollPosition;
};

export default useScrollPositionDebounced;
