# CraftTrust Services & API Dependencies Analysis

## 📊 Current Secret Status Summary
- **Available**: 1 out of 50+ required secrets
- **Missing**: All external service API keys
- **Database**: ✅ PostgreSQL configured and available

---

## 🔑 Critical Services & Required Secrets

### 1. Authentication & Wallet Management
**Service**: Magic SDK (Passwordless Auth + Crypto Wallets)
- `MAGIC_SECRET_KEY` ❌ **Missing**
- `MAGIC_SECRET_KEY_2` ❌ **Missing** (Secondary key for redundancy)  
- `NEXT_PUBLIC_ENV_MAGIC_PUBLISHABLE_KEY` ❌ **Missing**
- **Impact**: Core authentication system non-functional
- **Recommendation**: **Critical - Get Magic SDK keys first**

### 2. Blockchain Infrastructure
**Service**: Hedera Hashgraph Network
- `HEDERA_PHRASE` ❌ **Missing** (Encrypted mnemonic)
- `HEDERA_PHRASE_CLIENT` ❌ **Missing** (Client mnemonic)
- `HEDERA_PLATFORM_ACCOUNT_ID` ❌ **Missing** (Account ID)
- `HEDERA_IS_TESTNET` ❌ **Missing** (true/false)
- `HEDERA_IS_ED25519` ❌ **Missing** (true/false)
- `HEDERA_PLATFORM_ACCOUNT_PATH` ❌ **Missing** (Account path number)
- `HEDERA_TOKEN` ❌ **Missing**
- `HEDERA_NFT_CONTRACT` ❌ **Missing**
- `HEDERA_SWAP_CONTRACT` ❌ **Missing**
- `HEDERA_WHBAR_TOKEN` ❌ **Missing**
- `HEDERA_SURVEY_NFT` ❌ **Missing**
- `HEDERA_SCENDMONEY_NFT` ❌ **Missing**
- **Impact**: All crypto/NFT features disabled
- **Recommendation**: **High Priority - Essential for cannabis supply chain tracking**

### 3. Communication Services
**Service**: Twilio (SMS, WhatsApp, Chat)
- `TWILIO_ACCOUNT_SID` ❌ **Missing**
- `TWILIO_AUTH_TOKEN` ❌ **Missing**
- `TWILIO_API_KEY` ❌ **Missing**
- `TWILIO_API_SECRET` ❌ **Missing**
- `TWILIO_PHONE` ❌ **Missing**
- `TWILIO_WHATSAPP` ❌ **Missing**
- `TWILIO_CHAT_SERVICE_ID` ❌ **Missing**
- `TWILIO_IS_SEND_SMS` ❌ **Missing** (true/false)
- **Impact**: No SMS notifications, chat, or WhatsApp integration
- **Recommendation**: **Medium Priority - Can be stubbed for development**

---

## 🛠 Development & Analytics Services

### 4. Error Monitoring
**Service**: Sentry
- `SENTRY_DSN` ❌ **Missing**
- `NEXT_PUBLIC_ENV_SENTRY_URL` ❌ **Missing**
- `NEXT_PUBLIC_ENV_BACKEND` ❌ **Missing** (Environment name)
- **Impact**: No error tracking or performance monitoring
- **Recommendation**: **Low Priority - Can develop without**

### 5. User Analytics & Marketing
**Service**: Customer.io
- `CUSTOMERIO_HOST` ❌ **Missing**
- `CUSTOMERIO_KEY_TRACK` ❌ **Missing**
- `CUSTOMERIO_API` ❌ **Missing**
- **Impact**: No user journey tracking, email automation
- **Recommendation**: **Low Priority - Stub for development**

**Service**: Mixpanel
- `MIXPANEL_TOKEN` ❌ **Missing**
- **Impact**: No product analytics or user behavior tracking
- **Recommendation**: **Low Priority - Can develop without**

---

## ☁️ Cloud & Storage Services

### 6. Google Cloud Services
**Service**: Google Cloud Storage, Maps, OAuth, reCAPTCHA
- `GOOGLE_STORAGE_CREDENTIALS` ❌ **Missing** (JSON, encrypted)
- `GOOGLE_STORAGE_BUCKET_NAME` ❌ **Missing**
- `GOOGLE_STORAGE_CDN_FIRST` ❌ **Missing**
- `GOOGLE_STORAGE_CDN_SECOND` ❌ **Missing**
- `GOOGLE_CLIENT_ID` ❌ **Missing** (OAuth)
- `GOOGLE_CLIENT_SECRET` ❌ **Missing** (OAuth)
- `GOOGLE_CALLBACK_URL` ❌ **Missing**
- `GOOGLE_RECAPTCHA_SECRET_KEY` ❌ **Missing**
- **Impact**: No file storage, maps, Google login, or bot protection
- **Recommendation**: **Medium Priority - Can use local storage for development**

### 7. IPFS Storage
**Service**: Pinata (IPFS Gateway)
- `PINATA_API_KEY` ❌ **Missing**
- `PINATA_SECRET_API_KEY` ❌ **Missing** (Encrypted)
- **Impact**: No decentralized file storage for NFTs
- **Recommendation**: **Medium Priority - Can use local storage**

---

## 🏛 Compliance & Financial Services

### 8. Cannabis Compliance
**Service**: METRC (Cannabis Tracking System)
- `METRC_SOFTWARE_KEY` ❌ **Missing** (Encrypted)
- `METRC_SANDBOX` ❌ **Missing** (true/false)
- **Impact**: No regulatory compliance tracking for cannabis
- **Recommendation**: **High Priority - Essential for cannabis industry**

### 9. Crypto Payment Gateway
**Service**: Transak
- `TRANSAK_API_KEY` ❌ **Missing**
- `TRANSAK_API_SECRET` ❌ **Missing**
- **Impact**: No crypto payment processing
- **Recommendation**: **Medium Priority - Can stub for development**

### 10. Diamond Verification
**Service**: Diamondstandard
- `DIAMONDSTANDARD_URL` ❌ **Missing**
- `DIAMONDSTANDARD_API_KEY` ❌ **Missing**
- **Impact**: No diamond/product verification services
- **Recommendation**: **Low Priority - Feature-specific**

---

## 🔧 Infrastructure Secrets

### 11. Platform & Database
- `DATABASE_URL` ✅ **Available** (PostgreSQL)
- `PLATFORM_KEY` ❌ **Missing** (Master encryption key for other secrets)
- `REDIS_URL` ❌ **Missing** (Caching and sessions)
- `DB_URL` ❌ **Missing** (Alternative database connection)
- `DB_SCHEMA` ❌ **Missing** (Database schema, defaults to 'public')
- **Impact**: Core encryption, caching, and session management non-functional
- **Recommendation**: **Critical - Need platform key for secret decryption**

### 12. Platform Configuration
- `PLATFORM_ENV` ❌ **Missing** (local/dev/stage/prod)
- `PLATFORM_PORT` ❌ **Missing** (Backend port, defaults to 9000)
- `PLATFORM_BACKEND_URL` ❌ **Missing**
- `PLATFORM_EMAIL` ❌ **Missing**
- `PLATFORM_URL` ❌ **Missing**
- **Impact**: Environment-specific configurations unavailable
- **Recommendation**: **High Priority - Required for proper deployment**

---

## 📋 Development Strategy Recommendations

### Phase 1: Critical Setup (Can't develop without)
1. **Magic SDK Keys** - Authentication system foundation
2. **PLATFORM_KEY** - Required for all encrypted secret decryption
3. **Database** - ✅ Already configured and available
4. **Platform Configuration** - Environment setup

### Phase 2: Core Business Features (High Priority)
1. **Hedera Keys** - Blockchain and NFT functionality for supply chain
2. **METRC Keys** - Cannabis regulatory compliance tracking
3. **Google Cloud** - File storage, maps, and authentication
4. **Redis** - Caching and session management

### Phase 3: Enhanced User Experience (Can be stubbed)
1. **Twilio** - SMS, WhatsApp, chat (can log to console)
2. **Transak** - Crypto payments (can use mock transactions)
3. **Customer.io** - Email automation (can disable)
4. **Mixpanel** - Analytics (can use console logging)

### Phase 4: Optional Services (Nice to have)
1. **Sentry** - Error monitoring and performance
2. **Pinata** - IPFS storage for decentralized assets
3. **Diamondstandard** - Product verification
4. **Google reCAPTCHA** - Bot protection

---

## 🔒 Security Considerations

### Encryption Architecture
- Most sensitive secrets are encrypted using `PLATFORM_KEY`
- Encryption function: `decrypt(encryptedValue, platformKey, context)`
- Contexts used: 'storage', 'metrc', 'pinata', 'mnemonic', 'hedera'

### Environment Separation
- **LOCAL**: Development environment (localhost:5000)
- **DEV**: Development server (*.dev.crafttrust.com)
- **STAGE**: Staging environment (*.stage.crafttrust.com)
- **PROD**: Production environment (*.crafttrust.com)

---

## 🎯 Immediate Action Plan

### For Development Environment
1. **Obtain Magic SDK keys** (authentication core)
2. **Generate a PLATFORM_KEY** for encryption/decryption
3. **Set up Redis** locally or use memory cache
4. **Configure basic platform environment variables**
5. **Stub remaining services** with mock implementations

### For Production Deployment
1. **Register for all required service accounts**
2. **Implement proper secret management** (encrypted storage)
3. **Configure environment-specific keys** for each deployment stage
4. **Set up monitoring and analytics** services
5. **Enable compliance tracking** for cannabis regulations

---

## 📝 Service Registration Links

### Authentication & Blockchain
- **Magic SDK**: https://magic.link/
- **Hedera**: https://hedera.com/

### Communications
- **Twilio**: https://www.twilio.com/

### Cloud & Storage
- **Google Cloud**: https://cloud.google.com/
- **Pinata**: https://www.pinata.cloud/

### Analytics & Monitoring
- **Sentry**: https://sentry.io/
- **Customer.io**: https://customer.io/
- **Mixpanel**: https://mixpanel.com/

### Compliance & Payments
- **METRC**: https://www.metrc.com/
- **Transak**: https://transak.com/
- **Diamondstandard**: Contact vendor directly

---

## 💡 Development Tips

### Stubbing Services for Development
```typescript
// Example stub for Twilio SMS
if (!CONFIG.twilio.twilioAccountSid) {
  console.log(`SMS would be sent to ${phoneNumber}: ${message}`);
  return { success: true, messageId: 'dev-stub-' + Date.now() };
}
```

### Environment Variable Validation
```typescript
// Add validation for critical secrets
if (!process.env.MAGIC_SECRET_KEY) {
  throw new Error('MAGIC_SECRET_KEY is required for authentication');
}
```

### Graceful Service Degradation
- Log missing services without crashing
- Provide user-friendly error messages
- Disable features that require unavailable services
- Maintain core functionality even with missing integrations

---

*Last Updated: January 24, 2025*
*Project: CraftTrust Enterprise Cannabis Platform*