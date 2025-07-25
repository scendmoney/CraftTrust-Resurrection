  products: OrderProductModel[]
  facilityBuyer: FacilityModel
  facilityCultivator: FacilityModel
  contactPerson: UserModel
  // Delivery fields
  phone?: string
  address?: string
  city?: string
  zip?: number
  comments?: string
}
```

**Payment Types:**
- `PayNow`: Immediate crypto payment
- `PayOnDelivery`: Credit card at delivery
- `Net`: B2B credit terms (Net 30/60/90)

### **3. Product Pricing System**

**Product Model:**
```typescript
ProductModel {
  id: number
  price: number          // USD per unit
  quantity: number       // Total inventory (lbs)
  quantityStock: number  // Available stock (lbs)
  quantityStockMin: number // Min order (0.25 lbs default)
  status: ProductStatusEnum
  facility: FacilityModel
}
```

**Inventory Management:**
- Real-time stock deduction on order creation
- Auto-unlisting when `quantityStock` reaches 0
- METRC compliance tracking for cannabis regulations

---

## 💳 Payment Processing System

### **Current CARAT Payment Flow**

1. **Cart Calculation** (USD-based)
   ```typescript
   cart.costProducts = sum(cartItems.total)
   cart.fee = costProducts * platformFeePercentage / 100
   cart.total = costProducts + fee
   ```

2. **Token Rate Conversion**
   ```typescript
   // Get current CARAT/USD rate
   rateCaratToUSD = await DiamondstandardService.getCaratUsd(cultivatorAddress);
   
   // Convert USD amounts to CARAT
   totalCarat = ceil(order.total / rateCaratToUSD, 2);
   feeBuyerCarat = ceil(order.fee.feeBuyer / rateCaratToUSD, 2);
   feeCultivatorCarat = ceil(order.fee.feeCultivator / rateCaratToUSD, 2);
   ```

3. **Balance Verification**
   ```typescript
   balanceCarat = await hederaService.getAccountBalanceToken(
     buyerAddress, 
     CONFIG.hedera.token
   );
   
   if (balanceCarat < totalCarat) {
     // Redirect to token purchase via Transak
   }
   ```

4. **Blockchain Settlement**
   ```typescript
   // Create transaction record
   await TransactionModel.create({
     type: TransactionTypeEnum.buy,
     amount: totalCarat,
     amountUsd: order.total,
     tokenRate: rateCaratToUSD,
     token: 'CARAT'
   });
   
   // Execute Hedera transfer
   await hederaService.transferToken({
     accountFrom: { wallet: buyerAddress, path: buyerPath },
     accountTo: { wallet: cultivatorAddress, path: cultivatorPath },
     token: CONFIG.hedera.token,
     count: totalCarat
   });
   ```

### **Transaction Tracking System**

**Transaction Model:**
```typescript
TransactionModel {
  id: number
  type: TransactionTypeEnum    // buy, deposit, swap, withdrawal
  status: TransactionStatusEnum // new, processing, done, error, cancel
  amount: number              // Token amount
  amountUsd: number          // USD equivalent
  tokenRate: number          // Exchange rate at time
  token: string             // Token symbol
  fee: FeeData             // Platform fees
  facilityFrom: FacilityModel
  facilityTo: FacilityModel
  order?: OrderModel
  blockchainTransactions: TransactionBlockchainModel[]
}
```

**Blockchain Transaction Model:**
```typescript
TransactionBlockchainModel {
  transactionBlockchainId: string  // Hedera transaction ID
  feeHbar: number                 // Gas fee in HBAR
  fee: number                     // Gas fee in USD
  gasUsed: number
  gasLimit: number
  isSuccess: boolean
  error?: string
  errorCode?: number
}
```

---

## 🔗 Hedera Blockchain Integration

### **Core Services**

**HederaService Operations:**
- `transferToken()` - Token transfers between accounts
- `transferHbar()` - HBAR transfers for fees
- `swapTokenToHbar()` - DEX operations via swap contract
- `getAccountBalance()` - Balance queries
- `associateTransaction()` - Token associations
- `getTokenInfo()` - Token metadata

**Smart Contract Integration:**
- **Swap Contract**: `CONFIG.hedera.swapContract` for token exchanges
- **NFT Contract**: `CONFIG.hedera.contract` for product tracking
- **Token Associations**: Automatic association before transfers

### **Account Management**
- **Mnemonic-based**: HD wallet derivation
- **ED25519/ECDSA**: Configurable signature algorithms
- **Testnet/Mainnet**: Environment-specific networks
- **Path-based**: Hierarchical account structure

---

## 🏢 B2B Commerce Features

### **Net Payment Terms**
```typescript
FacilityToFacilityModel {
  facilityBuyer: FacilityModel
  facilityCultivator: FacilityModel
  isNetActivated: boolean    // Credit enabled
  netBalance: number         // Credit limit
  dueBalance: number        // Outstanding balance
  netDays: number          // Payment terms (30/60/90)
}
```

**Credit Flow:**
1. Check credit availability: `netBalance - dueBalance >= orderTotal`
2. Set payment due date: `paymentDate = today + netDays`
3. Create order with `PaymentStatusEnum.Due`
4. Track outstanding balances

### **Multi-Facility Management**
- **Buyer Facilities**: Dispensaries, distributors
- **Cultivator Facilities**: Growers, manufacturers
- **Role-based Pricing**: Different rates per relationship
- **Geographic Restrictions**: Location-based availability

---

## 📊 Fee Structure System

### **Configurable Platform Fees**
```typescript
ConfigurationModel {
  type: ConfigurationTypesEnum.commissionOrderBuyer      // Buyer fee %
  type: ConfigurationTypesEnum.commissionOrderCultivator // Seller fee %
  value: string  // Percentage as string
}
```

**Fee Application:**
- **Buyer Fee**: Added to total paid by buyer
- **Cultivator Fee**: Deducted from amount received by seller
- **Real-time Updates**: Fees recalculated on configuration changes

### **Fee Distribution in Transactions**
```typescript
// Current CARAT-based fees
feeBuyerCarat = ceil(order.fee.feeBuyer / rateCaratToUSD, 2);
feeCultivatorCarat = ceil(order.fee.feeCultivator / rateCaratToUSD, 2);

// Platform collects fees separately
await transferToken(buyer -> platform, feeBuyerCarat);
await transferToken(cultivator -> platform, feeCultivatorCarat);
await transferToken(buyer -> cultivator, mainAmountCarat);
```

---

## 🎯 **CRITICAL MIGRATION POINTS FOR TRST**

### **1. Token Rate Management**
**Current**: Dynamic CARAT/USD from DiamondStandard API
**TRST Migration**: Stable 1:1 USD peg (major simplification)

### **2. Balance Verification**
**Current**: `getAccountBalanceToken(address, CARAT_TOKEN_ID)`
**TRST Migration**: `getAccountBalanceToken(address, TRST_TOKEN_ID)`

### **3. Transfer Operations** 
**Current**: `transferToken({ token: CONFIG.hedera.token })`
**TRST Migration**: `transferToken({ token: CONFIG.hedera.trstToken })`

### **4. Fee Calculations**
**Current**: Complex USD->CARAT conversion with rounding
**TRST Migration**: Direct USD amounts (no conversion needed)

### **5. Transaction Records**
**Current**: Store `tokenRate`, `amount` (CARAT), `amountUsd`
**TRST Migration**: `tokenRate = 1.0`, `amount = amountUsd`

### **6. Cross-Chain Considerations**
**Current**: Hedera-only operations
**TRST Migration**: May need bridge operations for non-Hedera chains

---

## 🛠 **Implementation Strategy for TRST**

### **Phase 1: Token Configuration**
```typescript
// Add to environment config
HEDERA_TRST_TOKEN=0.0.XXXXXX  // TRST token ID
TRST_BRIDGE_CONTRACT=0.0.XXXXX // Cross-chain bridge if needed

// Update HederaOptions
hedera: {
  // ... existing config
  trstToken: process.env.HEDERA_TRST_TOKEN,
  bridgeContract: process.env.TRST_BRIDGE_CONTRACT
}
```

### **Phase 2: Payment Flow Updates**
```typescript
// Replace CARAT rate lookup
// OLD: rateCaratToUSD = await DiamondstandardService.getCaratUsd()
// NEW: rateTrstToUSD = 1.0 (stable peg)

// Simplified token calculations
// OLD: totalCarat = ceil(order.total / rateCaratToUSD, 2)
// NEW: totalTrst = order.total (1:1 USD peg)

// Update transfer calls
await hederaService.transferToken({
  accountFrom: buyer,
  accountTo: cultivator,
  token: CONFIG.hedera.trstToken, // Changed from CONFIG.hedera.token
  count: totalTrst
});
```

### **Phase 3: Cross-Chain Bridge Integration**
```typescript
// If TRST needs cross-chain operations
if (requiresBridge(fromChain, toChain)) {
  await bridgeService.initiateCrossChainTransfer({
    fromToken: TRST_TOKEN_ID,
    toChain: targetChain,
    amount: totalTrst,
    recipient: recipientAddress
  });
}
```

---

## 📋 **Migration Checklist**

### **Environment Configuration**
- [ ] Add `HEDERA_TRST_TOKEN` environment variable
- [ ] Configure TRST token association for all accounts
- [ ] Set up brale.xyz API credentials if needed
- [ ] Test cross-chain bridge connections

### **Code Updates**
- [ ] Replace `CONFIG.hedera.token` with `CONFIG.hedera.trstToken`
- [ ] Update `DiamondstandardService.getCaratUsd()` calls to use fixed 1.0 rate
- [ ] Modify fee calculations to use direct USD amounts
- [ ] Update transaction recording to reflect TRST usage
- [ ] Add cross-chain bridge support if required

### **Database Schema**
- [ ] Update transaction records to include chain information
- [ ] Modify token rate fields to accommodate 1:1 peg
- [ ] Add bridge transaction tracking if needed

### **Testing Requirements**
- [ ] Test TRST token transfers on Hedera testnet
- [ ] Verify cross-chain operations if applicable
- [ ] Validate fee calculations with stable pricing
- [ ] Confirm balance queries for TRST tokens
- [ ] Test order completion flow end-to-end

---

## 📞 **Key Integration Points**

**Files requiring updates for TRST migration:**
1. `src/config/index.ts` - Token configuration
2. `libs/hedera/src/hedera.service.ts` - Transfer operations
3. `src/entities/order/order.resolver.ts` - Payment processing
4. `src/entities/order/order.service.ts` - Order creation
5. `libs/diamondstandard/src/` - Rate service replacement
6. `src/entities/transaction/` - Transaction tracking

**External dependencies:**
- **brale.xyz API** - TRST rate data and cross-chain operations
- **Hedera Token Service** - TRST token associations
- **Bridge Contracts** - Cross-chain transfer mechanisms

---

*Analysis prepared for TRST migration - CraftTrust Commerce System*
*Document Date: January 24, 2025*