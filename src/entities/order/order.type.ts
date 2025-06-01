export interface IPayOrder {
  orderId: number;
  facilityAddressFrom: string;
  facilityPathFrom: number;
  facilityAddressTo: string;
  facilityPathTo: number;
  total: number;
  fee: number;
  transactionId: number;
}
