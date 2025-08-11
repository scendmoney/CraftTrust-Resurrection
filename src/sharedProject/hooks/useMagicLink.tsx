/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
// import { HederaExtension } from '@magic-ext/hedera';
import { Magic } from 'magic-sdk';

function useMagicLink() {
  const [magicLink, setMagicLink] = useState<any | null>(null);

  useEffect(() => {
    const mg = new Magic(process.env.NEXT_PUBLIC_ENV_MAGIC_PUBLISHABLE_KEY || '', {
      // extensions: [
      //   new HederaExtension({
      //     network: 'mainnet'
      //   })
      // ]
    });
    setMagicLink(mg);
  }, []);

  const magicLogin = async (email: string) => {
    if (!magicLink) return null;
    try {
      const didToken = await magicLink.auth.loginWithMagicLink({ email });
      return didToken;
    } catch (error) {
      console.error('Magic login error:', error);
      throw error;
    }
  };

  const magicSMSLogin = async (phoneNumber: string) => {
    if (!magicLink) return null;
    try {
      const didToken = await magicLink.auth.loginWithSMS({ phoneNumber });
      return didToken;
    } catch (error) {
      console.error('Magic SMS login error:', error);
      throw error;
    }
  };

  const showWallet = async () => {
    if (!magicLink) return;
    try {
      await magicLink.wallet.showUI();
    } catch (error) {
      console.error('Magic wallet error:', error);
      throw error;
    }
  };

  return { 
    magicLink, 
    setMagicLink, 
    magicLogin, 
    magicSMSLogin, 
    showWallet,
    isReady: !!magicLink 
  };
}

export default useMagicLink;
