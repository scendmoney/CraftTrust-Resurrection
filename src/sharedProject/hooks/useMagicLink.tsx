/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
// import { HederaExtension } from '@magic-ext/hedera';
import { Magic } from 'magic-sdk';

function useMagicLink() {
  const [magicLink, setMagicLink] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initMagic = async () => {
      try {
        const publishableKey = process.env.NEXT_PUBLIC_ENV_MAGIC_PUBLISHABLE_KEY;
        
        if (!publishableKey) {
          console.warn('Magic publishable key not found');
          setIsInitialized(true);
          return;
        }

        const mg = new Magic(publishableKey, {
          // extensions: [
          //   new HederaExtension({
          //     network: 'mainnet'
          //   })
          // ]
        });
        
        setMagicLink(mg);
        setIsInitialized(true);
        console.log('Magic SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Magic SDK:', error);
        setIsInitialized(true);
      }
    };

    initMagic();
  }, []);

  const magicLogin = async (email: string) => {
    if (!magicLink) {
      console.warn('Magic SDK not initialized for email login');
      return null;
    }
    try {
      const didToken = await magicLink.auth.loginWithMagicLink({ email });
      return didToken;
    } catch (error) {
      console.error('Magic login error:', error);
      throw error;
    }
  };

  const magicSMSLogin = async (phoneNumber: string) => {
    if (!magicLink) {
      console.warn('Magic SDK not initialized for SMS login');
      return null;
    }
    try {
      const didToken = await magicLink.auth.loginWithSMS({ phoneNumber });
      return didToken;
    } catch (error) {
      console.error('Magic SMS login error:', error);
      throw error;
    }
  };

  const showWallet = async () => {
    if (!magicLink) {
      console.warn('Magic SDK not initialized for wallet');
      return;
    }
    try {
      await magicLink.wallet.showUI();
    } catch (error) {
      console.error('Magic wallet error:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!magicLink) {
      console.warn('Magic SDK not initialized for logout');
      return;
    }
    try {
      await magicLink.user.logout();
    } catch (error) {
      console.error('Magic logout error:', error);
      throw error;
    }
  };

  return { 
    magicLink, 
    setMagicLink, 
    magicLogin, 
    magicSMSLogin, 
    showWallet,
    logout,
    isReady: !!magicLink && isInitialized,
    isInitialized
  };
}

export default useMagicLink;
