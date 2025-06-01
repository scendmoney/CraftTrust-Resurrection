import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AppContext from 'appContext';
import { useRouter } from 'next/router';

function useLogout() {
  const router = useRouter();
  const { setToken } = useContext(AppContext);
  const client = useApolloClient();

  return {
    logout: logoutHandler,
    router
  };

  async function logoutHandler() {
    await router.replace({
      pathname: '/auth'
    });

    if (localStorage) {
      for (const key in localStorage) {
        if (key === 'TOKEN') {
          localStorage.removeItem(key);
        }
      }
    }

    setToken('');
    await client.clearStore();
  }
}

export default useLogout;
