import { useCallback, useRef } from 'react';

/**
 * Custom React Hook for controlling video playback.
 *
 * This hook handles play and pause of a video element on mouse enter and leave events.
 * It takes the initial video play time in seconds as an argument and returns an object
 * with the video reference and the handlers for the mouse enter and leave events.
 *
 * @param {number} startTime The time (in seconds) from where the video should start playing.
 * @returns {Object} An object containing the video reference and the handlers for mouse enter and leave events.
 * @returns {React.MutableRefObject<HTMLVideoElement | null>} .videoRef The reference to the video element.
 * @returns {Function} .handleMouseEnter The handler for the mouse enter event.
 * @returns {Function} .handleMouseLeave The handler for the mouse leave event.
 *
 * @example
 * const { videoRef, handleMouseEnter, handleMouseLeave } = useVideoPlayback(5);
 * <video ref={videoRef} preload="metadata" src="myVideo.mp4" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
 *
 * @author Pavel Devyatov
 *
 */

type TUseVideoPlaybackReturnType = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
};

const useVideoPlayback = (startTime: number): TUseVideoPlaybackReturnType => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  }, [startTime]);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  return { videoRef, handleMouseEnter, handleMouseLeave };
};

export default useVideoPlayback;
