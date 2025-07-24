import { decrypt, safeDecrypt, parseRedisConnectionString } from '@src/utils/utils';
import { CustomerioOptions } from 'libs/customerio/src';
import { DiamondstandardOptions } from 'libs/diamondstandard/src';
import { HederaOptions } from 'libs/hedera/src';
import { MetrcAuthBasic } from 'libs/metrc/src';
import { PinataDTO } from 'libs/pinata/src';
import { IORedis } from 'libs/redis/src/';
import { SentryOptions } from 'libs/sentry/src/sentry.types';
import { StorageDTO } from 'libs/storage/src';
import { TransakOptions } from 'libs/transak/src';
import { TwilioOptions } from 'libs/twilio/src/twilio.types';

export const CONFIG = {
  platform: {
    key: process.env.PLATFORM_KEY,
    ENV: process.env.PLATFORM_ENV,
    port: parseInt(process.env.PLATFORM_PORT, 10) || 9000,
    backendUrl: process.env.PLATFORM_BACKEND_URL,
    email: process.env.PLATFORM_EMAIL,
    platformUrl: process.env.PLATFORM_URL || '',
    recoveryPasswordHours: 1,
    isCron: process.env.ENV?.toLowerCase().includes('cron'),
  },
  database: {
    url: process.env.DB_URL,
    schema: process.env.DB_SCHEMA || 'public',
    type: 'postgres' as const,
    name: 'default',
    logging: false,
    autoLoadEntities: true,
  },
  graphql: {
    name: 'graphql',
    autoSchemaFile: true,
    debug: true,
    installSubscriptionHandlers: true,
    path: '/graphql',
    sortSchema: true,
    uploads: false,
    playground: process.env.PLATFORM_ENV !== 'prod',
    introspection: process.env.PLATFORM_ENV !== 'prod',
  },
  redis: {
    options: {
      ...(process.env.REDIS_URL ? parseRedisConnectionString(process.env.REDIS_URL) : {
        host: 'localhost',
        port: 6379,
        username: null,
        password: null,
      }),
      retryStrategy: (times) => {
        const delay = 5000;
        if (times >= 12 * 5) {
          return new Error('REDIS CONNECTION TERMINATED');
        }
        return delay;
      },
    },
    isCache: true,
    isTransport: false,
    isGraphql: true,
    expireToken: 7 * 24 * 60 * 60,
  } as IORedis,
  gcs: {
    cdnFirst: process.env.GOOGLE_STORAGE_CDN_FIRST,
    cdnSecond: process.env.GOOGLE_STORAGE_CDN_SECOND,
    backetName: process.env.GOOGLE_STORAGE_BUCKET_NAME,
    backetCredentials: (() => {
      const decryptedCredentials = safeDecrypt(
        process.env.GOOGLE_STORAGE_CREDENTIALS,
        process.env.PLATFORM_KEY,
        'storage'
      );
      return decryptedCredentials ? JSON.parse(decryptedCredentials) : null;
    })(),
  } as StorageDTO,
  metrc: {
    softwareApiKey: safeDecrypt(
      process.env.METRC_SOFTWARE_KEY,
      process.env.PLATFORM_KEY,
      'metrc',
    ),
    url: `https://${
      process.env.METRC_SANDBOX === 'true' ? 'sandbox-' : ''
    }api-or.metrc.com`,
  } as MetrcAuthBasic,
  pinata: {
    pinataSecretApiKey: safeDecrypt(
      process.env.PINATA_SECRET_API_KEY,
      process.env.PLATFORM_KEY,
      'pinata',
    ),
    pinataApiKey: process.env.PINATA_API_KEY,
  } as PinataDTO,
  isProd: ['prod'].includes(process.env.PLATFORM_ENV),
  google: {
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    recaptchaSecretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  },
  twilio: {
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioApiKey: process.env.TWILIO_API_KEY,
    twilioApiSecret: process.env.TWILIO_API_SECRET,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhone: process.env.TWILIO_PHONE,
    twilioWhatsApp: process.env.TWILIO_WHATSAPP,
    twilioServiceChatSid: process.env.TWILIO_CHAT_SERVICE_ID,
    isSendSMS: process.env.TWILIO_IS_SEND_SMS === 'true',
  } as TwilioOptions,
  transak: {
    apiKey: process.env.TRANSAK_API_KEY,
    apiSecret: process.env.TRANSAK_API_SECRET,
  } as TransakOptions,
  hedera: {
    mnemonic: safeDecrypt(
      process.env.HEDERA_PHRASE,
      process.env.PLATFORM_KEY,
      'mnemonic',
    ),
    mnemonicClient: safeDecrypt(
      process.env.HEDERA_PHRASE_CLIENT,
      process.env.PLATFORM_KEY,
      'mnemonic',
    ),
    isTestnet: process.env.HEDERA_IS_TESTNET === 'true',
    isED25519: process.env.HEDERA_IS_ED25519 === 'true',
    hederaAccountId: safeDecrypt(
      process.env.HEDERA_PLATFORM_ACCOUNT_ID,
      process.env.PLATFORM_KEY,
      'hedera',
    ),
    hederaPath: Number(process.env.HEDERA_PLATFORM_ACCOUNT_PATH),
    token: process.env.HEDERA_TOKEN,
    contract: process.env.HEDERA_NFT_CONTRACT,
    swapContract: process.env.HEDERA_SWAP_CONTRACT,
    whbar: process.env.HEDERA_WHBAR_TOKEN,
    surveyNFTToken: process.env.HEDERA_SURVEY_NFT,
    scendMoneyNFTToken: process.env.HEDERA_SCENDMONEY_NFT,
  } as HederaOptions,
  diamondstandard: {
    url: process.env.DIAMONDSTANDARD_URL,
    apiKey: process.env.DIAMONDSTANDARD_API_KEY,
  } as DiamondstandardOptions,
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: `${process.env.PLATFORM_ENV}${
      process.env.ENV?.toLowerCase().includes('cron') ? '_cron' : ''
    }`,
  } as SentryOptions,
  customerIo: {
    host: process.env.CUSTOMERIO_HOST,
    keyTrack: process.env.CUSTOMERIO_KEY_TRACK,
    api: process.env.CUSTOMERIO_API,
  } as CustomerioOptions,
};
