import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function useAuth() {
  const router = useRouter();

  const [token, setToken] = useState<string>('');
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      updateTokenLocalStorage();
    }
    setIsAuthReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady, router?.pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (router.isReady && router?.query?.session === 'expired') {
        setToken('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  const isOnAuthPages = router.pathname.includes('auth');
  const isReady = isAuthReady && router.isReady;

  return {
    token,
    setToken: setTokenLocalStorage,
    updateToken: updateTokenLocalStorage,
    isLoggedIn,
    isReady,
    isOnAuthPages,

    router
  };

  function setTokenLocalStorage(token: string) {
    localStorage.setItem('TOKEN', token);
    setToken(token);
    setIsLoggedIn(true);
  }

  async function updateTokenLocalStorage() {
    if (typeof window !== 'undefined') {
      const tokenFromLocalStorage = localStorage.getItem('TOKEN') || '';
      if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);
        setIsLoggedIn(true);
      }
    }
  }
}

export default useAuth;
