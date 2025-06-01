import { useEffect, useRef } from 'react';

/**
 * Custom hook for automatic scrolling of an element on mouse hover.
 *
 * @param {React.RefObject<HTMLDivElement>} ref - The ref of the DOM element to apply scrolling to.
 * @param {number} [speed=10] - The speed of the scrolling (the interval in milliseconds during which the scrolling occurs).
 * @param {number} [scrollAmount=1] - The amount of pixels the element will shift on each scrolling step.
 *
 * @returns {object} Returns an object with two event handlers: `handleMouseOver` and `handleMouseLeave` that can be applied to the DOM element.
 *
 * @example
 *
 * const MyComponent: FC<IProps> = ({ block }) => {
 *   const ref = useRef<HTMLDivElement | null>(null);
 *   const { handleMouseOver, handleMouseLeave } = useHoverScroll({ ref, speed: 5, scrollAmount: 2 });
 *
 *   return (
 *     <div
 *       ref={ref}
 *       onMouseOver={() => handleMouseOver('right')}
 *       onMouseLeave={handleMouseLeave}
 *     >
 *       // your content
 *     </div>
 *   );
 * };
 *
 * @author Pavel Devyatov
 */

type Direction = 'left' | 'right';

interface IUseHoverScrollProps {
  ref: React.RefObject<HTMLDivElement>;
  speed?: number;
  scrollAmount?: number;
}

const useHoverScroll = ({ ref, speed = 10, scrollAmount = 1 }: IUseHoverScrollProps) => {
  const scrollAnimation = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = (direction: Direction) => {
    if (ref.current) {
      const scrollVal = direction === 'right' ? scrollAmount : -scrollAmount;

      scrollAnimation.current = setInterval(() => {
        if (ref.current) {
          ref.current.scrollLeft += scrollVal;
        }
      }, speed);
    }
  };

  const handleMouseLeave = () => {
    if (scrollAnimation.current) {
      clearInterval(scrollAnimation.current);
      scrollAnimation.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (scrollAnimation.current) {
        clearInterval(scrollAnimation.current);
      }
    };
  }, []);

  return { handleMouseOver, handleMouseLeave };
};

export default useHoverScroll;
