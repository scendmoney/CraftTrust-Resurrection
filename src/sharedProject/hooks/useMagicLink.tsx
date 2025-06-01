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

  return { magicLink, setMagicLink };
}

export default useMagicLink;
