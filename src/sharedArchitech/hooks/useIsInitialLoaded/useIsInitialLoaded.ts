import { useState } from 'react';

function useIsInitialLoaded() {
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);

  function handleSetIsInitialLoaded() {
    setIsInitialLoaded(true);
  }

  return { isInitialLoaded, setIsInitialLoaded: handleSetIsInitialLoaded };
}

export default useIsInitialLoaded;
