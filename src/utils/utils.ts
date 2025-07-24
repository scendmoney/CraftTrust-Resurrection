import crypto from 'crypto';
import { camelCase } from 'lodash';

export const passwordReg =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const removeUnderscores = <T>(items): T => {
  const getObj = (item) => {
    const newObg = {};
    Object.keys(item).forEach((key) => {
      if (!Array.isArray(item[key]) && item[key] instanceof Object) {
        newObg[key.split('__').join('')] = removeUnderscores<T>(item[key]);
      } else {
        newObg[key.split('__').join('')] = item[key];
      }
    });
    return newObg;
  };

  return Array.isArray(items)
    ? (items.map((item) => getObj(item)) as unknown as T)
    : (getObj(items) as T);
};

export const parseRedisConnectionString = (connectionString: string) => {
  const parsedUrl = new URL(connectionString);

  // Extracting values ​​from URL
  const host = parsedUrl.hostname || 'localhost';
  const port = parseInt(parsedUrl.port, 10) || 6379;
  const username = parsedUrl.username || null;
  const password = parsedUrl.password || null;

  // Result as an object
  const redisConfig = {
    host,
    port,
    username,
    password,
  };

  return redisConfig;
};

export const encrypt = (text: string, key1: string, key2: string) => {
  try {
    const key1Crypto = createKeyFromString(key1);
    const key2Crypto = createKeyFromString(key2);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      key1Crypto,
      Buffer.from(key2Crypto.slice(0, 16)),
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  } catch (error) {
    throw new Error(`Encrypt: ${error.message}`);
  }
};

export const decrypt = (text: string, key1: string, key2: string) => {
  try {
    const encryptedText = Buffer.from(text, 'hex');
    const key1Crypto = createKeyFromString(key1);
    const key2Crypto = createKeyFromString(key2);
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      key1Crypto,
      Buffer.from(key2Crypto.slice(0, 16)),
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    throw new Error(`Decrypt: ${error.message}`);
  }
};

// Safe decrypt that returns null if secret is missing or decryption fails
export const safeDecrypt = (encryptedValue: string | undefined, platformKey: string | undefined, context: string): string | null => {
  if (!encryptedValue || !platformKey) {
    console.warn(`Missing encrypted value or platform key for context: ${context}`);
    return null;
  }
  
  try {
    return decrypt(encryptedValue, platformKey, context);
  } catch (error) {
    console.warn(`Failed to decrypt ${context}: ${error.message}`);
    return null;
  }
};

function createKeyFromString(str: string) {
  return crypto
    .createHash('sha256')
    .update(str)
    .digest()
    .subarray(0, 16)
    .toString('hex');
}

export const toCamelCase = <T>(items): T => {
  const getObj = (item) => {
    if (Array.isArray(item)) {
      return item.map((subItem) => toCamelCase(subItem));
    } else if (item instanceof Object) {
      const newObj = {};
      Object.keys(item).forEach((key) => {
        newObj[camelCase(key)] = toCamelCase(item[key]);
      });
      return newObj;
    }
    return item;
  };

  return getObj(items);
};

export const addPrifixEmail = (text: string, prifix: string): string => {
  if (prifix === 'prod') return text;
  if (prifix === 'local') return `${text}-dev`;
  return `${text}-${prifix}`;
};

export const logoNfts = [
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-1.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-2.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-3.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-4.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-5.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-6.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-7.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-8.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-9.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-10.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-11.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-12.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-13.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-14.jpeg',
  'https://ipfs.io/ipfs/QmWm4HCYfceziBeLB9weQHwCtRQE59dPWoU2JBPC7p7dYY/nft-15.jpeg',
];
