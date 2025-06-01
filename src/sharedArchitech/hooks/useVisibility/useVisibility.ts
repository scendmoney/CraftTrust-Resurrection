/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

interface UseVisibilityOptions {
  partialVisibility?: boolean;
}

const useVisibility = (ref: React.RefObject<Element>, options: UseVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { partialVisibility = false } = options;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: partialVisibility ? 0.1 : 1.0
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, partialVisibility]);

  return isVisible;
};

export default useVisibility;
