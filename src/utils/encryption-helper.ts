/**
 * Encryption Helper Utility for CraftTrust
 * 
 * Use this utility to encrypt new API keys and secrets for the platform.
 * All encrypted secrets use the PLATFORM_KEY for decryption.
 */

import { encrypt } from './utils';

// Platform key from environment
const PLATFORM_KEY = process.env.PLATFORM_KEY || 'crafttrust-dev-platform-key-fa90073d1531c9e534386d9d96fb76d1';

/**
 * Encrypt a secret for use in environment variables
 * @param secretValue - The plain text secret to encrypt
 * @param context - The context/service name (storage, metrc, pinata, mnemonic, hedera)
 * @returns Encrypted hex string ready for environment variables
 */
export function encryptSecret(secretValue: string, context: string): string {
  if (!secretValue) {
    throw new Error('Secret value is required');
  }
  
  if (!context) {
    throw new Error('Context is required (storage, metrc, pinata, mnemonic, hedera)');
  }

  try {
    const encrypted = encrypt(secretValue, PLATFORM_KEY, context);
    console.log(`✅ Encrypted secret for context: ${context}`);
    console.log(`📋 Add this to your environment variables:`);
    console.log(`   ${getEnvVarName(context)}="${encrypted}"`);
    return encrypted;
  } catch (error) {
    throw new Error(`Failed to encrypt secret: ${error.message}`);
  }
}

/**
 * Get the environment variable name for a given context
 */
function getEnvVarName(context: string): string {
  const contextMap = {
    'storage': 'GOOGLE_STORAGE_CREDENTIALS',
    'metrc': 'METRC_SOFTWARE_KEY',
    'pinata': 'PINATA_SECRET_API_KEY',
    'mnemonic': 'HEDERA_PHRASE or HEDERA_PHRASE_CLIENT',
    'hedera': 'HEDERA_PLATFORM_ACCOUNT_ID'
  };
  
  return contextMap[context] || `UNKNOWN_CONTEXT_${context.toUpperCase()}`;
}

/**
 * Command line usage example:
 * 
 * const helper = require('./encryption-helper');
 * 
 * // Encrypt Magic SDK secret
 * helper.encryptSecret('sk_live_your_magic_secret_key', 'magic');
 * 
 * // Encrypt Hedera mnemonic
 * helper.encryptSecret('word1 word2 word3...', 'mnemonic');
 * 
 * // Encrypt METRC API key
 * helper.encryptSecret('your-metrc-api-key', 'metrc');
 */

// Export for Node.js command line usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { encryptSecret };
}