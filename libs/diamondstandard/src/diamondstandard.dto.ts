export class DiamondstandardOptions {
  url: string;
  apiKey: string;
  accountId: string;
}

export class SellReferenceDto {
  sellReference: string;
  spenderAccountId: string;
}

export class InitiateSellRequestDto {
  success: boolean;
  requestId: number;
}

export class HistoryDto {
  'id': string;
  'sellerId': string;
  'status': string;
  'sellReference': string;
  'quotedPrice': string;
  'quantity': string;
  'expiryTime': string;
  'signingPublicKey': string;
  'allowanceTxnId': string;
  'transferTxnId': string;
  'sellerEmail': string;
  'callbackUrl': string;
  'requestedAt': string;
  'transferredAt': string;
  'processedAt': string;
  'sellerName': string;
  'email': string;
  'hederaAccountId': string;
  'bankName': string;
  'accountName': string;
  'accountNumber': string;
  'routingNumber': string;
}
