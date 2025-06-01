export interface SellReferenceInput {
  accountId: string;
  quantity: number;
  price: number;
}

export interface InitiateSellRequestInput extends SellReferenceInput {
  accountId: string;
  sellReference: string;
  transactionId: string;
  signature: (string | number)[];
}

export interface SellRequestStatusInput {
  accountId: string;
  requestId: number;
}

export interface HistoryInput {
  accountId: string;
  startDate?: string; //format: ISO
  endDate?: string; //format: ISO
}
