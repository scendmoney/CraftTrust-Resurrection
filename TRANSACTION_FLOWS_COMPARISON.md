# 💰 CraftTrust Transaction Flows: Current vs MatterFi Integration

**Prepared for**: MatterFi SDK Integration Planning  
**Project**: CraftTrust Cannabis Commerce Platform  
**Date**: January 25, 2025  
**Focus**: Payment Processing & Transaction Flow Transformation

---

## 🔄 Executive Summary

**Current System**: CARAT token-based payments with volatile exchange rates and complex multi-step processing  
**Target System**: TRST stablecoin (1:1 USD peg) with simplified, contextual B2B payments via MatterFi SDK

### **Key Transformation Benefits**
- ✅ **Eliminate Exchange Rate Volatility** - Fixed 1:1 USD peg vs dynamic CARAT/USD rates
- ✅ **Simplify Payment Processing** - Direct USD amounts vs token conversion calculations  
- ✅ **Reduce Transaction Steps** - Single MatterFi call vs multi-service coordination
- ✅ **Enhanced Compliance Context** - Native cannabis metadata vs external tracking
- ✅ **Improved User Experience** - Transparent pricing vs hidden conversion fees

---

## 🏗️ Current CARAT Transaction Architecture

### **System Components**
```typescript
// Current payment stack
DiamondstandardService  →  CARAT/USD rate fetching
HederaService          →  Blockchain token transfers  
C14.money             →  Fiat-to-CARAT onramp
TransactionModel      →  Multi-status tracking
OrderModel            →  Payment coordination
```

### **Payment Flow Complexity**
1. **Rate Calculation** - Dynamic CARAT/USD conversion
2. **Balance Validation** - Check CARAT token balance
3. **Fee Calculation** - Separate buyer/seller fees in CARAT
4. **Multi-Service Coordination** - 3+ external API calls
5. **Transaction State Tracking** - 5 status states + blockchain confirmations

---

## 📊 Transaction Flow Comparison

## **A. Order Creation & Payment Initiation**

### **CURRENT FLOW (CARAT)**
```typescript
// Step 1: Create Order with Fee Calculations
async createOrder(orderQuery, cart) {
  // Calculate total in USD
  let total = 0;
  cart.items.forEach(item => {
    total += item.product.price * (item.quantity / 0.25);
  });
  
  // Apply percentage-based fees
  const feeBuyer = (commissionRate * total) / 100;
  const feeCultivator = (commissionRate * total) / 100;
  
  // Store order with USD amounts
  order.total = total;
  order.fee = { feeBuyer, feeCultivator };
  
  return order;
}

// Step 2: Payment Link Generation
async getPaymentOrderLink(orderId) {
  // Fetch current CARAT exchange rate (varies by cultivator!)
  const rateCaratToUSD = await DiamondstandardService.getCaratUsd(
    cultivatorAddress
  );
  
  // Convert USD to CARAT tokens needed
  const totalCarat = ceil(order.total / rateCaratToUSD, 2);
  const feeBuyer = ceil(order.fee.feeBuyer / rateCaratToUSD, 2);
  
  // Check wallet balance in CARAT
  const balanceCarat = await hederaService.getAccountBalanceToken(
    buyerAddress, CARAT_TOKEN
  );
  
  if (balanceCarat < totalCarat) {
    // Generate C14.money purchase link
    return `https://pay.c14.money/?targetAmount=${totalCarat + feeBuyer}`;
  }
  
  // Process immediate payment if sufficient balance
  return processCaratPayment(order, totalCarat);
}
```

### **PROPOSED FLOW (TRST + MatterFi)**
```typescript
// Step 1: Simplified Order Creation
async createOrder(orderQuery, cart) {
  // Direct USD calculations (no conversion needed)
  let total = 0;
  cart.items.forEach(item => {
    total += item.product.price * (item.quantity / 0.25);
  });
  
  // USD-based fees (transparent pricing)
  const feeBuyer = (commissionRate * total) / 100;
  const feeCultivator = (commissionRate * total) / 100;
  
  // Store order with final USD amounts
  order.total = total;
  order.fee = { feeBuyer, feeCultivator };
  
  return order;
}

// Step 2: Direct Payment Processing
async processPayment(orderId) {
  const order = await getOrder(orderId);
  
  // Single MatterFi SDK call with context
  const result = await matterFi.send({
    to: `@${order.facilityCultivator.businessName}`,
    amount: order.total, // Direct USD amount
    context: {
      type: "cannabis_b2b_purchase",
      orderId: order.id,
      invoice: {
        items: order.products.map(p => ({
          strain: p.parentProduct.name,
          quantity: `${p.quantity} lb`,
          unitPrice: p.price,
          total: p.total,
          metrcId: p.parentProduct.metrcId,
          labResult: p.parentProduct.labResultHash
        })),
        subtotal: order.total,
        fees: {
          buyer: order.fee.feeBuyer,
          cultivator: order.fee.feeCultivator
        }
      },
      compliance: {
        buyerLicense: order.facilityBuyer.license,
        sellerLicense: order.facilityCultivator.license,
        metrcTrackingIds: order.products.map(p => p.parentProduct.metrcId),
        timestamp: new Date().toISOString(),
        regulatoryHash: generateComplianceHash(order)
      }
    }
  });
  
  // Update order status based on MatterFi response
  await updateOrderPaymentStatus(orderId, 'paid');
  return result;
}
```

---

## **B. Transaction State Management**

### **CURRENT TRANSACTION MODEL (Complex Multi-State)**
```typescript
// Current transaction states and types
enum TransactionStatusEnum {
  new = 'new',
  processing = 'processing', 
  done = 'done',
  error = 'error',
  cancel = 'cancel'
}

enum TransactionTypeEnum {
  buy = 'buy',
  deposit = 'deposit', 
  withdrawal = 'withdrawal',
  swap = 'swap'
}

// Additional Diamond Standard states
enum DiamondstandardStatusEnum {
  QUOTE = 'QUOTE',
  REQUEST_INITIATED = 'REQUEST_INITIATED',
  CARAT_TRANSFER_INITIATED = 'CARAT_TRANSFER_INITIATED',
  CARAT_TRANSFER_COMPLETED = 'CARAT_TRANSFER_COMPLETED',
  CARAT_TRANSFER_FAILED = 'CARAT_TRANSFER_FAILED',
  REQUEST_PROCESSED = 'REQUEST_PROCESSED',
  REQUEST_REJECTED = 'REQUEST_REJECTED',
  REQUEST_CANCELLED = 'REQUEST_CANCELLED'
}

// Current transaction record
const transaction = {
  type: TransactionTypeEnum.buy,
  status: TransactionStatusEnum.processing,
  amount: 125.50, // CARAT tokens
  amountUsd: 2500.00, // USD equivalent
  tokenRate: 19.92, // Current CARAT/USD rate
  token: 'CARAT',
  fee: { feeBuyer: 5.25, feeCultivator: 7.50 }, // In CARAT
  diamondstandardStatus: DiamondstandardStatusEnum.QUOTE,
  facilityFrom: buyerId,
  facilityTo: cultivatorId,
  orderId: orderId
};
```

### **PROPOSED TRANSACTION MODEL (Simplified)**
```typescript
// Simplified transaction states with MatterFi
enum TransactionStatusEnum {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed'
}

enum TransactionTypeEnum {
  cannabis_purchase = 'cannabis_purchase',
  deposit = 'deposit',
  withdrawal = 'withdrawal'
}

// Streamlined transaction record
const transaction = {
  type: TransactionTypeEnum.cannabis_purchase,
  status: TransactionStatusEnum.completed,
  amount: 2500.00, // Direct USD amount (TRST 1:1 peg)
  currency: 'TRST',
  fee: { buyer: 125.00, cultivator: 175.00 }, // In USD
  matterFiId: 'mf_tx_abc123xyz',
  context: {
    orderId: orderId,
    businessContext: 'B2B Cannabis Purchase',
    complianceData: { /* cannabis-specific metadata */ }
  },
  facilityFrom: '@BuyerDispensary',
  facilityTo: '@CultivatorFarm',
  timestamp: '2025-01-25T10:30:00Z'
};
```

---

## **C. Wallet & Balance Management**

### **CURRENT SYSTEM (Multi-Service Complexity)**
```typescript
// Current balance calculation across multiple systems
async getFacilityBalance(wallet: string, facilityId: string) {
  // Fetch CARAT balance from Hedera
  const caratBalance = await hederaService.getAccountBalanceToken(
    wallet, CARAT_TOKEN
  );
  
  // Get current exchange rate (varies by facility!)
  const rate = await DiamondstandardService.getCaratUsd(wallet);
  
  // Calculate various balance types
  const facility = await getFacility(facilityId);
  const balanceBlocked = facility.balanceProcessingWithdraw || 0;
  const balanceBuy = facility.balance || 0;
  
  return {
    token: 'CARAT',
    rate: rate, // Volatile rate
    balanceWallet: {
      balance: caratBalance,
      balanceUsd: caratBalance * rate // Calculated conversion
    },
    balanceBlocked: {
      balance: balanceBlocked,
      balanceUsd: balanceBlocked * rate
    },
    balanceBuy: {
      balance: balanceBuy, 
      balanceUsd: balanceBuy * rate
    }
  };
}
```

### **PROPOSED SYSTEM (Direct USD Balances)**
```typescript
// Simplified balance with MatterFi integration
async getFacilityBalance(facilityId: string) {
  const facility = await getFacility(facilityId);
  
  // Single MatterFi SDK call for balance
  const balance = await matterFi.getWalletBalance({
    walletId: facility.matterFiWalletId
  });
  
  return {
    currency: 'TRST',
    rate: 1.00, // Stable 1:1 USD peg
    available: balance.available, // Direct USD amount
    pending: balance.pending, // Pending transactions
    total: balance.total, // Total balance
    lastUpdated: balance.timestamp
  };
}
```

---

## **D. User Interface Transaction Display**

### **CURRENT UI (Complex Token Display)**
```tsx
// Current transaction display components
const TransactionDetails = ({ transaction }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <InputText
        titleText="Amount"
        value={`${transaction.amount} CARAT`} // Token amount
        readOnly
      />
    </Grid>
    <Grid item xs={6}>
      <InputText
        titleText="Amount USD" 
        value={`$${transaction.amountUsd}`} // Converted amount
        readOnly
      />
    </Grid>
    <Grid item xs={12}>
      <InputText
        titleText="Exchange Rate"
        value={`1 CARAT = $${transaction.tokenRate} USD`} // Volatile rate
        readOnly
      />
    </Grid>
  </Grid>
);
```

### **PROPOSED UI (Simplified USD Display)**
```tsx
// Simplified transaction display with MatterFi
const TransactionDetails = ({ transaction }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <InputText
        titleText="Amount"
        value={`$${transaction.amount} USD`} // Direct USD amount
        readOnly
      />
    </Grid>
    <Grid item xs={6}>
      <InputText
        titleText="Payment Method"
        value="TRST Stablecoin" // Stable currency
        readOnly
      />
    </Grid>
    <Grid item xs={12}>
      <InputText
        titleText="Business Context"
        value={transaction.context.businessContext} // Meaningful description
        readOnly
      />
    </Grid>
  </Grid>
);
```

---

## **E. Compliance & Cannabis-Specific Features**

### **CURRENT SYSTEM (External Tracking)**
```typescript
// Current compliance data handling
const orderCompliance = {
  // Basic order information
  orderId: "ORD-2025-001",
  total: 2500.00,
  
  // External METRC integration (separate system)
  metrcTrackingIds: ["1A4000000000022000000001"],
  
  // Limited cannabis context
  products: [
    { name: "Blue Dream", quantity: "2.5 lb", price: 1000 }
  ],
  
  // Separate compliance tracking
  licenses: {
    buyer: "CDPH-10001234",
    seller: "CDPH-10005678"
  }
};
```

### **PROPOSED SYSTEM (Native Cannabis Context)**
```typescript
// Integrated cannabis compliance with MatterFi
const enhancedCompliance = {
  // Core transaction
  orderId: "ORD-2025-001",
  amount: 2500.00,
  currency: "TRST",
  
  // Native cannabis context in payment metadata
  context: {
    type: "cannabis_b2b_purchase",
    industry: "cannabis",
    complianceLevel: "state_regulated",
    
    // Detailed product information
    products: [
      {
        strain: "Blue Dream",
        category: "flower",
        quantity: "2.5 lb",
        unitPrice: 400.00,
        total: 1000.00,
        thcContent: "22.5%",
        cbdContent: "0.8%",
        metrcId: "1A4000000000022000000001",
        labResultHash: "0xabc123...",
        harvestDate: "2024-12-15",
        testDate: "2025-01-10"
      }
    ],
    
    // Compliance metadata
    compliance: {
      buyerLicense: "CDPH-10001234",
      sellerLicense: "CDPH-10005678",
      regulatoryState: "California",
      transactionType: "wholesale",
      complianceHash: "0xdef456...",
      auditTrail: "enabled",
      reportingRequired: true
    },
    
    // Business relationship
    relationship: {
      establishedDate: "2024-03-15",
      creditTerms: "net_30",
      totalOrdersYtd: 47,
      totalVolumeYtd: 125.5
    }
  }
};
```

---

## 🎯 Migration Impact Analysis

### **Technical Complexity Reduction**
| Aspect | Current (CARAT) | Proposed (TRST) | Improvement |
|--------|-----------------|-----------------|-------------|
| **API Calls per Payment** | 5-7 calls | 1 call | 85% reduction |
| **Exchange Rate Calculations** | Dynamic, per-cultivator | Fixed 1:1 USD | 100% elimination |
| **Transaction States** | 13 possible states | 3 simple states | 77% reduction |
| **External Dependencies** | 4 services | 1 service | 75% reduction |
| **Error Handling Scenarios** | 15+ failure modes | 3 failure modes | 80% reduction |

### **User Experience Improvements**
- ✅ **Transparent Pricing** - No hidden conversion fees or rate fluctuations
- ✅ **Faster Checkout** - Single-click payments vs multi-step process
- ✅ **Clear Transaction History** - Business context vs cryptic token amounts
- ✅ **Predictable Costs** - Fixed USD amounts vs volatile token pricing
- ✅ **Simplified Accounting** - Direct USD records vs conversion tracking

### **Cannabis Industry Benefits**
- ✅ **Enhanced Compliance** - Native cannabis metadata in payment context
- ✅ **Regulatory Reporting** - Built-in audit trails and compliance hashes
- ✅ **Business Intelligence** - Rich transaction context for analytics
- ✅ **Industry Standards** - Cannabis-specific payment categorization
- ✅ **Audit Readiness** - Comprehensive compliance documentation

---

## 🔄 Migration Strategy

### **Phase 1: Parallel Implementation**
1. Implement MatterFi SDK alongside existing CARAT system
2. Create feature flags for payment method selection
3. Test TRST payments with select cultivator partners
4. Validate compliance metadata capture

### **Phase 2: Gradual Transition** 
1. Offer TRST as payment option for new orders
2. Migrate existing relationships to TRST gradually
3. Maintain CARAT support for legacy transactions
4. Monitor transaction success rates and user feedback

### **Phase 3: Full Migration**
1. Default all new payments to TRST/MatterFi
2. Phase out CARAT payment option
3. Archive legacy CARAT transaction data
4. Optimize UI for TRST-only experience

### **Risk Mitigation**
- Maintain dual payment support during transition
- Comprehensive testing with cannabis compliance requirements
- Backup transaction recording for audit purposes
- Real-time monitoring of payment success rates

---

## 📋 Implementation Checklist

### **✅ Ready for Integration**
- [x] Order creation and management system
- [x] Transaction recording infrastructure  
- [x] User interface components for payments
- [x] Cannabis compliance data collection
- [x] Business relationship management

### **🟡 Needs MatterFi Integration**
- [ ] SDK installation and configuration
- [ ] Wallet creation for existing facilities
- [ ] Business alias registration (@BusinessName)
- [ ] Payment processing endpoint replacement
- [ ] Transaction status webhook handling

### **🔴 Requires Development**
- [ ] Enhanced compliance metadata structure
- [ ] Cannabis-specific payment context UI
- [ ] Migration tools for existing data
- [ ] Parallel payment system support
- [ ] Comprehensive testing suite

---

**Bottom Line**: The MatterFi integration will transform CraftTrust from a complex, multi-service token payment system to a streamlined, cannabis-native USD payment platform with enhanced compliance features and dramatically improved user experience.

**Next Steps**: Technical integration planning session with MatterFi team to finalize SDK implementation approach and cannabis industry metadata requirements.